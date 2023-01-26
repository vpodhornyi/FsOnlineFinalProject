import api, {URLS} from "../services/API";

/**
 * @param file - image file
 * @param id - entity id to save img url in db
 * @param uploadType - types of upload in enum at backend twitterdan/config/UploadTypes
 * @description:  sends request to ImageController.java that saves img url to entity depends on upload type
 */

export const uploadImage = async (file, id, uploadType) => {
  const formData = new FormData();
  formData.append('upload', file);
  formData.append("entityId", String(id));
  formData.append("uploadType", uploadType);

  return await api.post(URLS.CLOUD.IMAGE, formData);
}
