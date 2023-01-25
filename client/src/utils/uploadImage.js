import api, {URLS} from "../services/API";

export const uploadImage = async (file, id, uploadType) => {
  const formData = new FormData();
  formData.append('upload', file);
  formData.append("entityId", String(id));
  formData.append("uploadType", uploadType);

  return await api.post(URLS.CLOUD.IMAGE, formData);
}
