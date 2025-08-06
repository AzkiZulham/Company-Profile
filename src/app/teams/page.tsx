'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Testimonials from '@/components/testimonial';
import CompanyOverview from '@/components/companyoverview';

type TeamMember = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
  location: {
    city: string;
    country: string;
  };
};

export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('https://randomuser.me/api/?results=6');
        const data = await res.json();
        setTeam(data.results);
      } catch (err) {
        console.error('Failed to fetch team:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Teams</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading team members...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <Image
                src={member.picture.large}
                alt={`${member.name.first} ${member.name.last}`}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {member.name.first} {member.name.last}
              </h2>
              <p className="text-sm text-[#00C4E2] font-medium mt-1">Senior Developer</p>
              <p className="text-gray-600 text-sm mt-2">
                Based in {member.location.city}, {member.location.country}. Contact at {member.email}.
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
