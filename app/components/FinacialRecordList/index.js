// Using bootstrap

// import React, { Component } from 'react';
// import FinacialRecord from '@components/FinacialRecord'
// import { MainWrapper } from '@components/MainWrapper';

// class FinacialRecordList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       records: [
//         {
//           id: 1, date: "2018-11-13", title: "学习费用", "amount": 10000
//         },
//         {
//           id: 2, date: "2018-11-1", title: "生活费用", "amount": 1000
//         },
//         {
//           id: 3, date: "2018-3-13", title: "旅游费用", "amount": 2000
//         },
//       ]
//     }
//   }
  
//   render() {
//     const { records } = this.state
//     console.log(this.state.records)
//     return (
//       <div className="finacial-list">
//         <h2>Finacial list</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>date</th>
//               <th>title</th>
//               <th>amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               this.state.records.map(record => {
//                 return (
//                   <FinacialRecord
//                     key={record.id}
//                     record={record}
//                   >
//                   </FinacialRecord>
//                 )
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//     )
//   }
// }

// export default FinacialRecordList;