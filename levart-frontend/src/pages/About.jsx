import aboutBg from "../assets/images/about-background.svg";
import about1 from "../assets/images/about-1.svg";
import about2 from "../assets/images/about-2.svg";
import about3 from "../assets/images/about-3.svg";
function About() {
  return (
    <div className="w-full">
      <div className="w-full bg-gradient-to-b from-navClr to-white">
        <div className="w-full mx-auto max-w-7xl">
          <img
            alt="Discover Card"
            src={aboutBg}
            className="w-full h-60 object-fill"
          />
        </div>
      </div>
      <div className="w-full my-10 mx-auto max-w-5xl px-4">
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-mainText text-center">
            About Levart: Where Travel Stories Come Together
          </h1>
        </div>
        <div className="w-full flex justify-center xsm:my-10 md:my-5">
          <h1 className="lg:text-center md:text-start text-secondary-text font-medium">
            Welcome to a revolutionary social travel platform where wanderlust
            meets connection. At Levart - Beyond Destinations, Creating
            Memories, we've created more than just another travel app - we've
            built a vibrant community where explorers like you can discover,
            share, and plan extraordinary adventures together.
          </h1>
        </div>
        <div className="grid xsm:grid-cols-1 md:grid-cols-2 my-10 gap-x-10">
          <div className="w-full flex justify-center xsm:my-10 md:my-5  bg-gradient-to-b from-navClr to-white rounded-2xl p-5">
            <img
              src={about1}
              alt="about-1 preview"
              // className="xsm:max-w-xs xsm:h-5/6  md:w-11/12 rounded-2xl "
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-5">
            <p className="text-secondary-text font-medium">
              Discover a world filled with endless travel possibilities through
              our carefully curated collection of destinations, activities, and
              places to stay. From bustling city centers to serene hideaways,
              every corner of the globe becomes accessible through our platform.
            </p>
            <p className="text-secondary-text font-medium">
              Dive into authentic experiences shared by our community members,
              who regularly update the platform with their latest finds. Whether
              it's a charming café in Paris or a secret beach in Thailand, our
              users' genuine reviews and up-to-the-minute recommendations help
              you uncover treasures that match your travel style.
            </p>
          </div>
        </div>
        <div className="grid xsm:grid-cols-1 md:grid-cols-2 md:my-5 gap-x-5">
          <div className=" flex flex-col justify-center space-y-5">
            <p className="text-secondary-text font-medium">
              Build meaningful connections with fellow travelers who share your
              wanderlust. Our platform makes it easy to find and follow
              adventurers whose journeys inspire you, whether they're
              backpacking through South America or luxury-hopping in the
              Mediterranean.
            </p>
            <p className="text-secondary-text font-medium">
              Create your own travel identity within our vibrant community.
              Share stories, join discussions in specialized groups, and build a
              network of global explorers who understand your passion for
              discovery.
            </p>
          </div>
          <div className="w-full flex justify-center xsm:my-10 md:my-5  bg-gradient-to-b from-navClr to-white rounded-2xl p-5">
            <img
              alt="about 2 preview"
              src={about2}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="grid xsm:grid-cols-1 md:grid-cols-2 my-10 gap-x-5">
          <div className="w-full flex justify-center xsm:my-10 md:my-5  bg-gradient-to-b from-navClr to-white rounded-2xl p-5">
            <img
              alt="about 3 preview"
              src={about3}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-5">
            <p className="text-secondary-text font-medium">
              Step into the future of travel planning with our sophisticated AI
              Trip Planner - LevartGuide AI. This innovative tool takes the
              stress out of organizing your next adventure by creating
              personalized itineraries that match your unique preferences.
            </p>
            <p className="text-secondary-text font-medium">
              Say goodbye to endless hours of research and hello to effortless
              planning. Simply tell us what you're looking for, and our AI will
              craft a journey that fits your style, schedule, and budget
              perfectly, leaving you free to focus on the excitement of your
              upcoming adventure.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center xsm:my-10 md:my-5">
          <h1 className="lg:text-center md:text-start text-secondary-text font-medium">
            At Levart, we believe that every journey is a story waiting to be
            told, and every traveler is a storyteller in their own right. Join
            our growing community of passionate explorers and let's write the
            next chapter of travel together. Whether you're planning your next
            adventure, sharing your experiences, or seeking inspiration from
            fellow travelers, Levart is your gateway to a world of authentic,
            connected, and intelligent travel experiences. Your journey begins
            here – welcome to the future of travel.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default About;
