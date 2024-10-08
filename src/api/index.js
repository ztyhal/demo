export const getTable = () => {
  // 返回结果封装成 Promise 对象
  return new Promise((resolve, reject) => {
    // 模拟请求
    let res = {
      code: 200,
      message: "请求成功",
      data: [{
        id: '海盐二期',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
        children: [{
          id: '1#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: '2#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: '3#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: '4#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }
          , {
          id: '5#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }
          , {
          id: '6#配电室',
          date: '2016-05-01',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }],
    };
    if (res.code == 200) {
      resolve(res);
    } else {
      reject(res);
    }
  });
};
export const getTree = () => {
  // 返回结果封装成 Promise 对象
  return new Promise((resolve, reject) => {
    // 模拟请求
    let res = {
      code: 200,
      message: "请求成功",
      data: [{
        id: 1,
        label: '海盐二期',
        level: '1',
        children: [{
          id: 4,
          label: '1#配电房',
          level: '2',
          children: [{
            id: 9,
            level: '3',
            label: '三级 1-1-1'
          }]
        },
        {
          id: 2,
          label: '2#配电房',
          level: '2',
        },
        {
          id: 3,
          label: '3#配电房',
          level: '2',
        },
        {
          id: 6,
          label: '3#配电房',
          level: '2',
        },
        {
          id: 7,
          label: '4#配电房',
          level: '2',
        },
        {
          id: 8,
          label: '5#配电房',
          level: '2',
        },
        {
          id: 10,
          label: '6#配电房',
          level: '2',
        },
        {
          id: 51,
          label: '7#配电房',
          level: '2',
        },
        {
          id: 55,
          label: '8#配电房',
          level: '2',
        },
  
        ]
      }],
    };
    if (res.code == 200) {
      resolve(res);
    } else {
      reject(res);
    }
  });
};