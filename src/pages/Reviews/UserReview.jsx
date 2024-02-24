function UserReview() {
    return (
      <article className="p-5 my-2 border border-slate-400 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 me-4 rounded-full"
            src="/docs/images/people/profile-picture-5.jpg"
            alt=""
          />
          <div className="font-medium dark:text-white">
            <p>Jese Leos </p>
          </div>
        </div>
        <time dateTime="2017-03-03 19:00">March 3, 2017</time>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          This is my third Invicta Pro Diver. They are just fantastic value for
          money. This one arrived yesterday and the first thing I did was set the
          time, popped on an identical strap from another Invicta and went in the
          shower with it to test the waterproofing.... No problems.
        </p>
  
        <aside>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            19 people found this helpful
          </p>
          <div className="flex items-center mt-3">
            <a
              href="#"
              className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Helpful
            </a>
          </div>
        </aside>
      </article>
    );
  };

  export default UserReview