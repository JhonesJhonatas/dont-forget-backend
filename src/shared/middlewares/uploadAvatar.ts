import multer from 'multer'
import path from 'path'
import crypto from 'node:crypto'
import mime from 'mime'
import { Request } from 'express'

const storageType = process.env.STORAGE_TYPE

class UploadAvatar {
  private storage() {
    if (storageType === 's3') {
      return
    }

    return multer.diskStorage({
      destination: (request, file, callback) => {
        callback(
          null,
          path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'),
        )
      },
      filename: (request: Request, file: Express.Multer.File, callback) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) callback(err, '')

          const fileName = `${hash.toString('hex')}-${file.originalname}`

          callback(null, fileName)
        })
      },
    })
  }

  private limits() {
    return {
      fileSize: 2 * 1024 * 1024,
    }
  }

  private fileFilter() {
    return (
      request: Request,
      file: Express.Multer.File,
      callback: multer.FileFilterCallback,
    ) => {
      const type = mime.extension(file.mimetype)
      const allowedExtensions = ['png', 'jpg', 'jpeg']

      if (allowedExtensions.includes(`${type}`)) {
        callback(null, true)
      }

      callback(null, false)
    }
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      limits: this.limits(),
      fileFilter: this.fileFilter(),
    }
  }
}

const uploadAvatar = new UploadAvatar()

export { uploadAvatar }
