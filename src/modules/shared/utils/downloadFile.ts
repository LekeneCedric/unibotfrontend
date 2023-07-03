// @ts-ignore
import RNFetchBlob from "react-native-fetch-blob";
import { storageBackend } from "../../../api/methods";
import RNFS from 'react-native-fs'
import { Platform } from "react-native";
const {fs} = RNFetchBlob;

const downloadFile = async (fileUrl: string, folderName: string) => {
  const fileName = fileUrl.split('/').pop(); // Extract the file name from the URL
  const downloadDir = `${RNFS.DownloadDirectoryPath}/${folderName}`;
  const downloadDest = `${downloadDir}/${fileName}`; // Destination path in the Downloads directory

  try {
    await RNFS.mkdir(downloadDir);

    const res = await RNFetchBlob.config({ fileCache: true, path: downloadDest })
      .fetch('GET', fileUrl);

    // Create a download notification
    if (Platform.OS === 'android') {
      RNFetchBlob.android.addCompleteDownload({
        title: fileName,
        description: 'Download complete',
        mime: res.respInfo.headers['Content-Type'],
        path: downloadDest,
        showNotification: true,
      });
    }
    console.log('File downloaded successfully:', downloadDest);
    return downloadDest;
  } catch (error) {
    console.log('Error downloading file:', error);
    throw error;
  }
}

const downloadFiles = async (fileUrls: string[],folderName: string) => {
  try {
    const downloadPromises = fileUrls.map((url) => downloadFile(`${storageBackend}/${url}`,folderName));
    const filePaths = await Promise.all(downloadPromises);
    console.log('All files downloaded successfully:', filePaths);
    // Do something with the downloaded file paths
  } catch (error) {
    console.log('Error downloading files:', error);
  }
};
// const downloadFile = (fileUrl: string) => {
//   return new Promise((resolve, reject) => {
//     const fileName = fileUrl.split('/').pop(); // Extract the file name from the URL
//     const filePath = fs.dirs.DocumentDir + '/' + fileName; // Path to save the file
//
//     // Start the download
//     RNFetchBlob.config({ fileCache: true, path: filePath })
//       .fetch('GET', fileUrl)
//       .then((res:any) => {
//         console.log('File downloaded successfully:', filePath);
//         resolve(filePath);
//       })
//       .catch((error: any) => {
//         console.log('Error downloading file:', error);
//         reject(error);
//       });
//   });
// };
// const downloadFiles = (fileUrls: string[]) => {
//   const downloadPromises = fileUrls.map((url) => downloadFile(`${storageBackend}/url`));
//   Promise.all(downloadPromises)
//     .then((filePaths) => {
//       console.log('All files downloaded successfully:', filePaths);
//       // Do something with the downloaded file paths
//     })
//     .catch((error) => {
//       console.log('Error downloading files:', error);
//     });
// };

export default downloadFiles;
