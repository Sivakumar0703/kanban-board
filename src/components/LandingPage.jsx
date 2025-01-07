import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faPalette, faArrowsUpDownLeftRight, faBarsProgress, faPenToSquare, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import backgroundSvg from '../assets/images/kanban_board.svg'; // Make sure to place the SVG file in the appropriate path
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  function gotoBoard(){
    navigate('/board');
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-violet-500 flex flex-col lg:flex-row items-center justify-between p-4">
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">Welcome to Kanban Board</h1>
        <img src={backgroundSvg} alt="Landing Illustration" className="max-w-full h-auto" />
      </div>
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 text-center space-y-4">
              <p className="text-xl text-white max-w-2xl">
          Manage your tasks effortlessly with our Kanban board web app. Create multiple columns, drag and drop tasks, track progress with progress bars, and much more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature
            title="Multiple Columns"
            description="Create and organize tasks in multiple columns."
            icon={faTableColumns}
          />
          <Feature
            title="Color Indication"
            description="Easily identify task priority with color indicators."
            icon={faPalette}
          />
          <Feature
            title="Drag and Drop"
            description="Drag and drop tasks between columns effortlessly."
            icon={faArrowsUpDownLeftRight}
          />
          <Feature
            title="Progress Tracking"
            description="Track task completion with progress bars."
            icon={faBarsProgress}
          />
          <Feature
            title="Edit and Delete"
            description="Edit and delete tasks and columns with ease."
            icon={faPenToSquare}
          />
          <Feature
            title="Deadline Highlighting"
            description="Highlight tasks that have met the deadline."
            icon={faHourglassStart}
          />
        </div>
        <button className="mt-4 px-6 py-3 bg-yellow-400 text-purple-500 font-semibold rounded-md shadow-lg hover:bg-yellow-300 transition duration-300" onClick={gotoBoard}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const Feature = ({ title, description, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
    <FontAwesomeIcon icon={icon} className="w-12 h-12 text-purple-500 mb-2" />
    <h2 className="text-xl font-bold text-purple-500">{title}</h2>
    <p className="text-gray-700 text-center">{description}</p>
  </div>
);

export default LandingPage;
