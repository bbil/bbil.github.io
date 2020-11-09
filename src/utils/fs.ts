import fs from 'fs'
import path from 'path'

export function readDir(dir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => {
            if (error) {
                reject(error)
            }

            resolve(files)
        })
    })
}

export function readFile(dir: string, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = path.join(dir, fileName)
        fs.readFile(filePath, (error, contents) => {
            resolve(contents.toString())
        })
    })
}
