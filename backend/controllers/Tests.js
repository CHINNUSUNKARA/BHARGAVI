const itemController = require('../controllers/itemController');

const router = itemController.getBrandDetails;

const handle=async()=>{
    const data = await router();
    console.log(data);

}
handle();