import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
// ! TODO  UPLOAD IMAGE AZURE
export const uploadImgCuarto = async(dataImage) => {// Upload

    const nameImgContainer = 'cuartosimagenes';
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    try {
        
        if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error('Azure Storage Connection string not found');
        }
  
        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
        );
  
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(nameImgContainer);
        
        // Create a unique name for the blob
        const blobName = 'cuartos' + uuidv4() + '.png';
  
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
        // Display blob name and url
        console.log(
            `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
            );
            
        const uploadBlobResponse = await blockBlobClient.upload(dataImage, dataImage.length);
        await blockBlobClient.setHTTPHeaders({
          blobHTTPHeaders: {
            blobContentType: 'image/png',
          }
        });
     
        console.log(
        `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );
        return { ok: true, urlImage: blockBlobClient.url, nombreImage: blobName }
  
    } catch (error) {
        console.log(error);
        throw Error('Ocurrió un error con el form');
    }
  }