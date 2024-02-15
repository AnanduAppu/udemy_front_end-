import React from 'react';

function ProfileSettings() {
  return (
    <div className="max-w-4xl mx-auto my-8 p-4 w-[100%]">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col mb-4">
            <label htmlFor="first-name" className="mb-2 font-medium">First Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="first-name"
              placeholder="John"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="last-name" className="mb-2 font-medium">Last Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="last-name"
              placeholder="Doe"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="small-intro" className="mb-2 font-medium">Small Intro</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="small-intro"
              placeholder="A brief introduction"
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="linkedin" className="mb-2 font-medium">Linked in</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="facebook" className="mb-2 font-medium">Face Book</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="facebook"
              placeholder="facebook.com/johndoe"
            />
          </div>
          
          <button>Edit</button>
        </div>
       
        <div className="flex flex-col items-center justify-center">
          <span className="relative flex h-44 w-44 shrink-0 overflow-hidden rounded-full mb-4">
            <img
              className="aspect-square h-full w-full"
              alt="Profile picture"
              src="https://res.cloudinary.com/djmrroluc/image/upload/v1706788255/udemyUserImage/aqw2ehahn0sfshffaz2n.jpg"
            />
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
          </span>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mb-2">
            Select image
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Upload image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
