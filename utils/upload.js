const util = require('util')
const gc = require('./storage')
const bucket = gc.bucket('innovillage') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
    if (!file) {
        reject('No image file')
    }
    let newFileName = `${Date.now()}-${file.originalname}`
    let fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
        resumable: false,
    })

    blobStream.on('error', (error) => {
        reject('Something is wrong! Unable to upload at the moment.')
    })

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = util.format(
            `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
        )
        resolve(url)
    })

    blobStream.end(file.buffer)

})

module.exports = uploadImage