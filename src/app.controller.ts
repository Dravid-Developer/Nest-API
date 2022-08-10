import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import console from 'console';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // upload( @UploadedFile() file: Express.Multer.File) {
  // console.log('file', file);
  // return 'File Upload API'
  // }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return 'File upload API';
  }
// to post any files
  @Post('/upload')
@UseInterceptors(AnyFilesInterceptor())
uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  console.log(files);
}

// to upload file in .txt extention 
@Post('/name')   
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads'
    , filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}))
async upload( @UploadedFile() file) {
  console.log(file)
}
}
