import fs from 'fs'

const getAllFiles = (path: string, extension?: string) => {
    const dir = fs.readdirSync(path);

    return dir.map((file) => {
        return [`${path}/${file}`, file];
    })
}

export default getAllFiles;