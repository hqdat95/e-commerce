import { Op } from 'sequelize';
import db from '../models/index';
import schedule from 'node-schedule';
import logger from '../config/winston';
import { manageImages, getFolderId } from '../services/drive.service';

const deleteFolders = async (pNames) => {
  await Promise.all(
    pNames.map(async (pName) => {
      const folderId = await getFolderId(pName);
      if (!folderId) {
        logger.warn(`No folder found for product ${pName}`);
        return;
      }

      try {
        await manageImages(folderId, true, true);
      } catch (error) {
        logger.error(`Failed to delete folder ${folderId}: ${error.message}`);
      }
    }),
  );
};

const deleteUrls = async (urls) => {
  return Promise.all(urls.map((url) => url.destroy({ force: true })));
};

const cleanupTask = () => {
  schedule.scheduleJob('0 0 1 */6 *', async () => {
    try {
      const time = new Date();
      time.setSeconds(time.getSeconds() - 20);

      const urls = await db.ProductImage.findAll({
        where: { deletedAt: { [Op.ne]: null } },
        paranoid: false,
      });

      logger.info(urls.length ? 'Deleting urls...' : 'No urls to delete.');

      const pIds = urls.map((url) => url.productId);

      const products = await db.Product.findAll({ where: { id: pIds } });

      logger.info(products.length ? 'Deleting products...' : 'No products found to delete.');

      const pNames = products.map((product) => product.name);

      await deleteFolders(pNames);
      await deleteUrls(urls);

      logger.info('Cleanup cycle completed!');
    } catch (err) {
      logger.error(`Cleanup task failed: ${err.message}`);
    }
  });
};

export default cleanupTask;
