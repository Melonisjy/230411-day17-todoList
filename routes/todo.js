const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

// 전체 todo리스트 조회
router.get("/", (req, res) => {
  console.log(todoData);
  res.json(todoData);
});

// 특정 todo리스트 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) > todoData.length - 1) {
    res.json({ error: "존재하지 않는 id입니다." });
  }

  res.json(todoData[parseInt(id)]);
});

// todo리스트 추가
router.post("/", (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) {
    res.status(400).json({ error: "제목과 설명을 둘 다 입력해주세요." });
  }

  todoData.push({ title, desc, isDone: false });

  res.json(todoData);
});

// todo리스트 수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  if (parseInt(id) > todoData.length - 1) {
    res.status(400).json({ error: "존재하지 않는 id입니다." });
  }

  if (!title && !desc) {
    res.status(400).json({ error: "제목과 설명 중 하나는 입력해주세요." });
  }

  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc,
    isDone: todoData[parseInt(id)].isDone,
  };

  res.json(todoData);
});

// todo 완료 상태 변경
router.put("/done/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) > todoData.length - 1) {
    res.status(400).json({ error: "존재하지 않는 id입니다." });
  }

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    isDone: !todoData[parseInt(id)].isDone,
  };

  res.json(todoData);
});

// todo 전체 삭제
router.delete("/", (req, res) => {
  todoData = todoData.filter(() => {
    return todoData.length === 0;
  });

  res.json(todoData);
});

// 특정 todo 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) > todoData.length - 1) {
    res.status(400).json({ error: "존재하지 않는 id입니다." });
  }

  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i;
  });

  res.json(todoData);
});

module.exports = router;
