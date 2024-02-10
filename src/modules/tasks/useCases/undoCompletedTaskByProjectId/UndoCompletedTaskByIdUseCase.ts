import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IUndoCompleteTaskDTO } from '../../dtos/IUndoCompleteTaskDTO'
import { AppError } from '../../../../errors/AppError'

@injectable()
class UndoCompletedTaskByIdUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ userId, completedTaskId }: IUndoCompleteTaskDTO) {
    const completedTasks =
      await this.tasksRepository.findConcludedTasksByUserId(userId)

    if (!completedTasks) {
      throw new AppError('Usuário não possui tarefas concluídas', 401)
    }

    const completedTask = completedTasks.find(
      (task) => task.id === completedTaskId,
    )

    if (!completedTask) {
      throw new AppError('Tarefa Inexistente', 401)
    }

    const createdOpenedTask = await this.tasksRepository.create({
      userId,
      description: completedTask.description,
      maturity: completedTask.maturity,
      priority: completedTask.priority,
      projectId: completedTask.projectId,
      status: 'toDo',
      title: completedTask.title,
    })

    const stopWatchesList = await this.tasksRepository.getStopWatchesByTaskId(
      completedTask.id,
    )

    if (stopWatchesList) {
      for (const stopWatch of stopWatchesList) {
        const editData =
          stopWatch.isActive === false
            ? {
                id: stopWatch._id.toString(),
                userId,
                startDate: stopWatch.startDate,
                endDate: stopWatch.endDate as Date,
                isActive: stopWatch.isActive,
                taskId: createdOpenedTask.id,
              }
            : {
                id: stopWatch._id.toString(),
                userId,
                startDate: stopWatch.startDate,
                endDate: new Date(),
                isActive: false,
                taskId: createdOpenedTask.id,
              }

        await this.tasksRepository.editStopWatch(editData)
      }
    }

    await this.tasksRepository.deleteConcludedTaskById(completedTask.id)

    return createdOpenedTask
  }
}

export { UndoCompletedTaskByIdUseCase }
