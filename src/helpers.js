// mock data
export const fetchFilePartsData = (fileId) => {
  // imagine the real data is not normalized like this
  const partsData = {
    a: [2, 4, 2, 3], // fileStatus 2 < length 4: failure
    b: [6, 2, 1], // fileStatus 6 > length 3: in progress
    c: [2, 2, 2, 2, 2] // fileStatus 5 === length 5: success
  };
  return partsData[fileId];
};

//
export const getFilePartStatuses = (fullFileIds) => {
  let data = {};

  // clearly this block is not done before the final return
  // how do i do that???
  fullFileIds.map((fileId) => {
    Promise.all([fetchFilePartsData(fileId)]).then((result) => {
      console.log("result: ", result?.[0]?.length);
      data[fileId] = result?.[0];
      return null;
    });
    return null;
  });
  console.log("data: ", data);

  // result of promise needs to be returned here...
  return data;
};

// returns a status message for each row
export const getJobStatus = (fileId, fileStatus, filePartsStatuses) => {
  console.log("fileStatus: ", fileStatus);
  console.log("filePartsStatuses: ", filePartsStatuses);
  console.log("typeof: ", typeof filePartsStatuses);
  console.log("filePartsStatuses keys: ", Object.keys(filePartsStatuses)); // empty array!!
  const filePartsStatus = filePartsStatuses?.[fileId]?.length;
  console.log("filePartsStatus: ", filePartsStatus); // UNDEFINED!!!

  if (fileStatus < filePartsStatus) {
    // arbitrary logic
    return "failure";
  } else if (fileStatus > filePartsStatus) {
    // arbitrary logic
    return "in progress";
  }
  return "success";
};

export default { fetchFilePartsData, getFilePartStatuses, getJobStatus };
