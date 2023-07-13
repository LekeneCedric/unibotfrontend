// @ts-ignore
import RNFetchBlob from "react-native-fetch-blob";
import { GET, storageBackend, urlBackend } from "../../../api/methods";
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from "react-native";
import { Platform } from "react-native";
import { err } from "react-native-svg/lib/typescript/xml";
const {fs} = RNFetchBlob;

// const downloadAndSaveZipFile = async (requestId: number) => {
//   console.warn(`${urlBackend}v1/user/request/download/${requestId}`)
//   const downloadDest = `${RNFS.DocumentDirectoryPath}/temp_zip_file.zip`;
//   try {
//     const response = await RNFS.downloadFile({
//       fromUrl: `${urlBackend}v1/user/request/download/${requestId}`, // Replace with your backend URL
//       toFile: downloadDest,
//       progress: (res) => {
//         const progressPercent = (res.bytesWritten / res.contentLength) * 100;
//         console.log(`Download progress: ${progressPercent}%`);
//       },
//     });
//     if (response.statusCode === 200) {
//       console.log('Zip file downloaded successfully');
//       console.log('File saved at:', downloadDest);
//     } else {
//       console.log('Failed to download the zip file');
//     }
//   } catch (err) {
//     console.warn('Error occurred during file download:', err);
//   }
// };
const downloadFile_ = (blob: Blob, filename: string) => {
  const { fs } = RNFetchBlob;
  const downloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
  const filePath = `${RNFS.DocumentDirectoryPath}/temp_zip_file.zip`;
  return fs.readFile(blob, 'base64')
    .then((data: any) => {
      const base64Data = `data:application/octet-stream;base64,${data}`;
      return fs.writeFile(filePath, base64Data, 'base64');
    })
    .then(() => {
      return fs.scanFile([{ path: filePath, mime: 'application/octet-stream' }]);
    })
    .catch((error: any) => {
      console.log('Error:', error);
    });
};

const downloadFile = async (request_id: number,token: string) => {
  try {
    const grantedPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to memory to download the file ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (grantedPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
      const backendURL = `v1/user/request/download/${request_id}`
      try {
        GET(backendURL,token)
          .then((response) => response.blob())
          .then((blob) => {
            try {
              const filename = 'file.zip';
                downloadFile_(blob, filename)
                .then(() => {
                  console.log('File downloaded successfully.');
                });

              // Rest of the code...
            } catch (error) {
              console.warn('Error occurred during ZIP file download:', error);
            }
          })

        // Rest of the code...
      } catch (error) {
        console.warn('Error occurred during ZIP file download:', error);
      }
    } else {
      console.log('Storage permission denied');
    }
  }
  catch (e) {
    console.warn('Failed to request storage permission:', e);
  }
  // const fileName = fileUrl.split('/').pop(); // Extract the file name from the URL
  // const downloadDir = `${RNFS.DownloadDirectoryPath}/${folderName}`;
  // const downloadDest = `${downloadDir}/${fileName}`; // Destination path in the Downloads directory
  //
  // try {
  //   await RNFS.mkdir(downloadDir);
  //
  //   const res = await RNFetchBlob.config({ fileCache: true, path: downloadDest })
  //     .fetch('GET', fileUrl);
  //
  //   // Create a download notification
  //   if (Platform.OS === 'android') {
  //     RNFetchBlob.android.addCompleteDownload({
  //       title: fileName,
  //       description: 'Download complete',
  //       mime: res.respInfo.headers['Content-Type'],
  //       path: downloadDest,
  //       showNotification: true,
  //     });
  //   }
  //   console.log('File downloaded successfully:', downloadDest);
  //   return downloadDest;
  // } catch (error) {
  //   console.log('Error downloading file:', error);
  //   throw error;
  // }
}
export default downloadFile;

// const downloadFiles = async (fileUrls: string[],folderName: string) => {
//   try {
//     const downloadPromises = fileUrls.map((url) => downloadFile(`${storageBackend}/${url}`,folderName));
//     const filePaths = await Promise.all(downloadPromises);
//     console.log('All files downloaded successfully:', filePaths);
//     // Do something with the downloaded file paths
//   } catch (error) {
//     console.log('Error downloading files:', error);
//   }
// };
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

// export default downloadFiles;
