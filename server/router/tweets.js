import express from 'express';

const router = express.Router();

const tweets = [];

router.get('/', (req, res) => {
  console.log(req);
  if (req.query.username) {
    // username으로 특정 트윗 조회
    res.send('Get /tweets?username=' + req.query.username);
  } else {
    // 모든 트윗 조회
    res.status(200).json({ tweets });
  }
});

router.get('/:id', (req, res) => {
  // id로 특정 트윗 조회
  res.send('Get /tweets/:id');
});

router.post('/', (req, res) => {
  // 트윗 생성
  res.send('Post /tweets');
});

router.put('/:id', (req, res) => {
  // 트윗 수정
  res.send('Put /tweets/:id');
});

router.delete('/:id', (req, res) => {
  // 트윗 삭제
  res.send('Delete /tweets/:id');
});

export default router;
