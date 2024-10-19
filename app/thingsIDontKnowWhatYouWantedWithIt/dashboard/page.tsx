// Stefan: I wans't sure what this is for so for the moment commented out. If you need it for something move it to the place you need it.


// "use client";

// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]); // Geri bildirim verilerini saklayacağız

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const feedbackCollection = collection(db, "feedbacks"); // Firestore'dan 'feedbacks' koleksiyonunu alıyoruz
//         const feedbackSnapshot = await getDocs(feedbackCollection);
//         const feedbackList = feedbackSnapshot.docs.map((doc) => doc.data());
//         setFeedbacks(feedbackList); // Verileri state'e atıyoruz
//       } catch (error) {
//         console.error("Error fetching feedbacks: ", error);
//       }
//     };

//     fetchFeedbacks(); // Sayfa yüklendiğinde verileri çekiyoruz
//   }, []);

//   return (
//     <div id="dashboardPage">
//       <h1>Dashboard</h1>
//       <ul>
//         {feedbacks.length > 0 ? (
//           feedbacks.map((fb, index) => (
//             <li key={index}>
//               {fb.user}: {fb.feedback} ({fb.rating} stars)
//             </li>
//           ))
//         ) : (
//           <p>No feedback available</p>
//         )}
//       </ul>
//     </div>
//   );
// }
