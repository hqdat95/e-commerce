import { google } from 'googleapis';
import { Readable } from 'stream';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export const executeQuery = async (query, fields = 'files(id, name)') => {
  const response = await drive.files.list({ q: query, fields });

  return response.data.files;
};

const createFolder = async (productName) => {
  const query = `name='${productName}' and mimeType='application/vnd.google-apps.folder' and '${process.env.FOLDER_DRIVE_ID}' in parents`;

  const files = await executeQuery(query);

  if (files.length) {
    return files[0].id;
  }

  const folderMetadata = {
    name: productName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [process.env.FOLDER_DRIVE_ID],
  };

  const { data: folder } = await drive.files.create({ resource: folderMetadata, fields: 'id' });

  return folder.id;
};

const trashOrDeleteItem = (fileId, doDelete = false) =>
  doDelete
    ? drive.files.delete({ fileId })
    : drive.files.update({ fileId, resource: { trashed: true } });

export const getFolderId = async (productName) => {
  const files = await executeQuery(
    `name='${productName}' and mimeType='application/vnd.google-apps.folder' and '${process.env.FOLDER_DRIVE_ID}' in parents`,
  );

  return files.length ? files[0].id : null;
};

export const createAndUploadToFolder = async (productName, files) => {
  const folderId = (await getFolderId(productName)) || (await createFolder(productName));

  await Promise.all(
    files.map((file) =>
      drive.files.create({
        resource: { name: `${Date.now()}_image`, parents: [folderId] },
        media: { mimeType: file.mimetype, body: Readable.from(file.buffer) },
        fields: 'id',
      }),
    ),
  );

  return `https://drive.google.com/drive/folders/${folderId}`;
};

export const manageImages = async (folderId, trashFolder = false, doDelete = false) => {
  const files = await executeQuery(`'${folderId}' in parents`);

  await Promise.all(files.map(({ id }) => trashOrDeleteItem(id, doDelete)));

  if (trashFolder && folderId !== process.env.FOLDER_DRIVE_ID) {
    await trashOrDeleteItem(folderId, doDelete);
  }
};

export const deleteFolder = async (folderId) => {
  await drive.files.delete({ fileId: folderId });
};
