import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { SITE_URL } from "@/constants/constants";
import { useState, useEffect } from 'react';

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
  }
};

export default async function TopicsList() {
  let [topics, setTopic] = useState([]);
  useEffect(() => {
    getTopics().then((data) => {
      setTopic (data.topics);
    });
  }, [])
  

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