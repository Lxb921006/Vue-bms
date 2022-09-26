// export function getRouter(userRouter=[], allRouter = []) {
//     let userRealRouter = [];
//     allRouter.forEach((v, i) => {
//       userRouter.forEach((item, index) => {
//         if (item.title === v.meta.name) {
//             v.hidden = true;
//             console.log(v.meta.name);
//           if (item.children && item.children.length > 0) {
//             getRouter(item.children, v.children);
//           } else {
//             v.children = [];
//           }
//           userRealRouter.push(v);
//         }
//       })
//     });
//     return userRealRouter;
//   }


export function getRouter(userRouter=[], allRouter = []) {
  let userRealRouter = [];
  for (let ai=0; ai < allRouter.length; ai++) {
    for (let ui=0; ui < userRouter.length; ui++) {
      if (userRouter[ui].title == allRouter[ai].meta.name) {
        allRouter[ai].hidden = true;
        userRealRouter.push(allRouter[ai]);
        if (userRouter[ui].children !=undefined && userRouter[ui].children.length > 0) {
          getRouter(userRouter[ui].children, allRouter[ai].children)
        }
      }
    }
  }
  return userRealRouter;
}
  
  