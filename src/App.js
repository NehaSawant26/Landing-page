import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { MdPhoneInTalk } from "react-icons/md";
import { Link } from "react-scroll"

const NavList = [
  {
    id: 1,
    text: "Home"
  },
  {
    id: 2,
    text: "Service"
  },
  {
    id: 3,
    text: "Price"
  },
  {
    id: 4,
    text: "Contact Us"
  }
]
const Navbar = ({ searchTerm, setSearchTerm }) => (
  <section className="flex items-center justify-center p-4 fixed w-full bg-slate-700">
    <ul className="flex font-semibold gap-8 text-white ">
      {NavList.map(({ id, text }) => (
        <li key={id} className="hover:scale-105 duration-200 cursor-pointer font-semibold text-xl">
          <Link to={text}
            smooth={true}
            duration={500}
            offset={-70}
            activeClass="active">
            {text}
          </Link>
        </li>
      ))}
    </ul>

    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search users"
      className="p-2 border rounded ml-40"
    />
  </section>
);

const HeroSection = () => (
  <section id="Home" className="h-screen bg-cover bg-center " style={{ backgroundImage: "url(https://st2.depositphotos.com/1071909/9476/i/450/depositphotos_94765666-stock-photo-customer-service-concept.jpg)" }}>
    <h1 className="text-5xl font-bold text-white p-36">Welcome to Our Service</h1>
  </section>
);

const ServiceCards = ({ filteredUsers }) => (
  <section id="Service" className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
    {filteredUsers?.map((user) => (
      <div key={user.id} className="p-6 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>
        <h2 className="text-lg font-semibold ">{user.company.name}</h2>
        <p>{user.company.catchPhrase}</p>
        <p>{user.company.bs}</p>
        <p className="font-medium">Website : {user.website}</p>
        <p className="flex mt-2"><MdPhoneInTalk className="size-5 mt-1 mr-2" />{user.phone}</p>
      </div>
    ))}
  </section>
);

const PricingTable = ({ filteredUsers }) => (
  <section id="Price" className="p-10">
    <h2 className="text-3xl font-bold mb-6">Our Pricing</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredUsers?.map((user) => (
        <div key={user.id} className="p-6 border rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">{user.company.name}</h3>
          <p className="text-xl mb-4">${user.id * 10}/mo</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Choose Plan</button>
        </div>
      ))}
    </div>
  </section>
);

const ContactForm = () => (
  <section id="Contact Us" className="p-10 text-center mt-10 mb-10">
    <h2 className="text-4xl font-bold mb-10">Contact Us</h2>
    <div className="flex justify-center items-center">
    <form className="grid grid-cols-1 gap-4 w-1/2">
      <input type="text" placeholder="Name" className="p-2 border border-gray-400 rounded" />
      <input type="email" placeholder="Email" className="p-2 border border-gray-400 rounded" />
      <textarea placeholder="Message" className="p-2 border border-gray-400 rounded" rows="5" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
    </form>
    </div>
  </section>
);

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

const insert = (root, word) => {
  let node = root;
  for (const char of word) {
    if (!node.children[char]) node.children[char] = new TrieNode();
    node = node.children[char];
  }
  node.isEndOfWord = true;
};

const search = (root, prefix) => {
  let node = root;
  for (const char of prefix) {
    if (!node.children[char]) return [];
    node = node.children[char];
  }
  return collectAllWords(node, prefix);
};

const collectAllWords = (node, prefix) => {
  let words = [];
  if (node.isEndOfWord) words.push(prefix);
  for (const char in node.children) {
    words = [...words, ...collectAllWords(node.children[char], prefix + char)];
  }
  return words;
};


const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);


  const trie = useMemo(() => {
    const root = new TrieNode();
    users.forEach((user) => insert(root, user.name.toLowerCase()));
    return root;
  }, [users]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setUsers(response.data);
      setFilteredUsers(response.data);
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const filteredNames = search(trie, searchTerm.toLowerCase());
        const matchedUsers = users.filter((user) =>
          filteredNames.includes(user.name.toLowerCase())
        );
        setFilteredUsers(matchedUsers);
      } else {
        setFilteredUsers(users);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, trie, users]);


  return (
    <div className="font-sans">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HeroSection />
      <ServiceCards filteredUsers={filteredUsers} />
      <PricingTable filteredUsers={filteredUsers} />
      <ContactForm />
    </div>
  );
};

export default LandingPage;
