import { useState, useEffect } from 'react';
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { SITE_URL } from "@/constants/constants";

const getTopics = async () => {
  try {
    const apiUrl = `${SITE_URL}/api/topics`;
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return an empty array if there's an error
  }
};

export default function TopicsList() {

  // let topics = [];
  // try{
  //   const data = await getTopics();
  //   if(data) topics = data.topics;
  // } catch (err) {
  //   console.error('Error fetching topics', err);
  // }
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopics();
        console.log("Fetched topics:", data); // Log fetched topics
        setTopics(data.topics);
      } catch (err) {
        console.error('Error fetching topics', err);
      }
    };
    
    fetchData();
  }, []); // Run only once on component mount

  console.log("Rendered topics:", topics); // Log rendered topics

  return (
    <div className="flex justify-center">
      {topics.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-200 text-left">
              <th className="py-3 px-4">S.No.</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t, index) => (
              <tr key={t._id}>
                <td className="py-3 px-4 border-b border-slate-300">{index + 1}</td> {/* Add sequence number */}
                <td className="py-3 px-4 border-b border-slate-300">{t.title}</td>
                <td className="py-3 px-4 border-b border-slate-300">{t.description}</td>
                <td className="py-3 px-4 border-b border-slate-300 flex gap-2">
                  <RemoveBtn id={t._id} />
                  <Link href={`${SITE_URL}/editTopic/${t._id}`}>
                    <HiPencilAlt size={24} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null} {/* Render nothing if no topics */}
    </div>
  );
}