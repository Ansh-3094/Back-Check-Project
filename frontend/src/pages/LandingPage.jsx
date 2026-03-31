import { Link } from "react-router-dom";

const featuredVideos = [
  {
    id: 1,
    title: "Street Food Tour: 12 Dishes in One Night",
    creator: "Taste Trails",
    views: "98K views",
    time: "1 day ago",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1730982218418-448f0d7bc8dd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    creatorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Morning Yoga for Beginners (20 Min)",
    creator: "Move With Riya",
    views: "76K views",
    time: "3 days ago",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    creatorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "Budget Travel Guide: Goa in 3 Days",
    creator: "Nomad Notes",
    views: "54K views",
    time: "5 days ago",
    thumbnail:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    creatorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    title: "Cricket Basics: Batting Tips for New Players",
    creator: "PlaySmart Sports",
    views: "43K views",
    time: "1 week ago",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    creatorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    title: "Build a Full-Stack Video App",
    creator: "CodeWithMia",
    views: "124K views",
    time: "2 days ago",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    creatorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    title: "React Performance in 15 Minutes",
    creator: "DevByte",
    views: "82K views",
    time: "1 week ago",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    creatorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const benefits = [
  {
    title: "Fast Uploads",
    description:
      "Optimized media pipeline to publish content quickly and reliably.",
  },
  {
    title: "Smart Search",
    description:
      "Find videos and creators instantly with better discovery filters.",
  },
  {
    title: "Creator Friendly",
    description:
      "Simple tools for publishing, organizing, and growing your channel.",
  },
  {
    title: "Secure Auth",
    description: "Protected sessions and account controls designed for safety.",
  },
];

const creators = [
  {
    name: "Millie Vlogs",
    bio: "Lifestyle and travel stories with practical tips for everyday life.",
    profileImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chef Arjun",
    bio: "Easy home recipes, food guides, and quick kitchen hacks.",
    profileImage:
      "https://plus.unsplash.com/premium_photo-1661721578455-d13b23ec66c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fit With sarah",
    bio: "Simple fitness routines and wellness content for all levels.",
    profileImage:
      "https://images.unsplash.com/photo-1606663485553-432d79af0620?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function LandingPage() {
  return (
    <div className="w-full pb-20 text-(--text) sm:pb-6">
      <section className="app-panel rounded-xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            <span className="text-red-600">PlayTube</span> :Discover, Learn, and
            Share Great Videos
          </h1>
          <p className="text-(--text-dim) sm:text-lg">
            A creator-first platform where audiences find quality content faster
            and creators grow with confidence.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/login"
              className="rounded-lg bg-(--brand) px-5 py-2.5 font-semibold transition hover:bg-(--brand-strong)"
            >
              Start Watching
            </Link>
            <Link
              to="/signup"
              className="rounded-lg border border-(--line) px-5 py-2.5 font-semibold text-(--text) transition hover:bg-(--surface-strong)"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-5 app-panel rounded-xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Videos</h2>
          {/* <Link
                to="/explore"
                className="text-sm font-medium text-(--accent) hover:underline"
            >
                View all
            </Link>    */}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredVideos.map((video) => (
            <article
              key={video.id}
              className="rounded-xl border border-(--line) bg-(--bg-soft) p-3 overflow-hidden"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-3 line-clamp-2 font-medium">{video.title}</h3>
              <p className="mt-1 text-sm text-(--text-dim)">{video.creator}</p>
              <p className="text-xs text-(--text-dim)">
                {video.views} • {video.time}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="app-panel rounded-xl p-5">
            <h3 className="text-lg font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-sm text-(--text-dim)">
              {benefit.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-5 app-panel rounded-xl p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Creator Spotlight</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {creators.map((creator) => (
            <article
              key={creator.name}
              className="rounded-xl border border-(--line) bg-(--bg-soft) p-4"
            >
              <img
                src={creator.profileImage}
                alt={creator.name}
                className="mb-3 h-12 w-12 rounded-full object-cover"
              />
              <h3 className="font-semibold">{creator.name}</h3>
              <p className="mt-2 text-sm text-(--text-dim)">{creator.bio}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  to="/login"
                  className="rounded-md bg-(--brand) px-3 py-1.5 text-sm font-medium hover:bg-(--brand-strong)"
                >
                  Follow
                </Link>
                <Link
                  to="/login"
                  className="rounded-md border border-(--line) px-3 py-1.5 text-sm font-medium hover:bg-(--surface-strong)"
                >
                  Visit Channel
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="app-panel rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">12K+</p>
          <p className="mt-1 text-sm text-(--text-dim)">Videos Uploaded</p>
        </div>
        <div className="app-panel rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">3.4K+</p>
          <p className="mt-1 text-sm text-(--text-dim)">Active Creators</p>
        </div>
        <div className="app-panel rounded-xl p-5 text-center">
          <p className="text-3xl font-bold">96K+</p>
          <p className="mt-1 text-sm text-(--text-dim)">Monthly Active Users</p>
        </div>
        <div className="app-panel rounded-xl p-5">
          <p className="text-sm text-(--text-dim)">
            "PlayTube helped us publish faster and reach the right audience in
            days."
          </p>
          <p className="mt-2 text-sm font-semibold">- Team PixelNest</p>
        </div>
      </section>

      <section className="mt-5 app-panel rounded-xl p-6 text-center sm:p-8">
        <h2 className="text-2xl font-semibold">Ready to start sharing?</h2>
        <p className="mt-2 text-(--text-dim)">
          Create your channel and connect with your audience today.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/signup"
            className="rounded-lg bg-(--brand) px-5 py-2.5 font-semibold transition hover:bg-(--brand-strong)"
          >
            Create account
          </Link>
          <Link
            to="/login"
            className="rounded-lg border border-(--line) px-5 py-2.5 font-semibold transition hover:bg-(--surface-strong)"
          >
            Login
          </Link>
        </div>
      </section>

      <footer className="mt-5 app-panel rounded-xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-(--text-dim)">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-(--text)">
              About
            </a>
            <a href="#" className="hover:text-(--text)">
              Contact
            </a>
            <a href="#" className="hover:text-(--text)">
              Terms
            </a>
            <a href="#" className="hover:text-(--text)">
              Privacy
            </a>
            <a href="#" className="hover:text-(--text)">
              Help
            </a>
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-(--text)">
              X
            </a>
            <a href="#" className="hover:text-(--text)">
              LinkedIn
            </a>
            <a href="#" className="hover:text-(--text)">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
