import express from 'express';
import {Message} from '../models';
import {AES,enc} from 'crypto-js';

const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await Message.findAll();
  res.json({messages});
});

/**
 * gets messages for userId. cheap hack. user id should be taken from a JWT, which should be in cookies.
 */
router.get('/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId) || -1;

  //this should be separated to a message service
  const messages = await Message.findAll({where: {toUserId: userId}, raw:true});
  await Message.destroy({where: {toUserId: userId}});
  const decrypted = messages.map(message => {
    //not the best way to keep secrets, but better than plaintext.
    const bytes=AES.decrypt(message.message, userId.toString());
    const plain = bytes.toString(enc.Utf8);
    return {...message, message:plain}
  });
  res.json({messages:decrypted});
});

/**
 * post message anonymously to user
 * @message - plain text of message
 * @toUserId - userID of target
 */
router.post('/', async (req, res) =>{
  const {toUserId,message} = req.body;
  // result of quick google search to encrypt secret
  const ciphertext = AES.encrypt(message, toUserId.toString()).toString();
  await Message.create({ message:ciphertext, toUserId: parseInt(toUserId) });
  res.sendStatus(200);
})




export default router;
