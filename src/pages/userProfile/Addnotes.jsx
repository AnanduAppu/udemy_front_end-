import React from 'react'

function Addnotes() {

    
    const [noteText, setnoteText] = useState('');
    const maxCharacters = 200;
    const handleChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxCharacters) {
          setnoteText(text);
        }
      };

      const handleSubmit = ()=>{

      }

  return (
    <div className="px-5">
    <h2 className="my-2">Add Notes</h2>
    <textarea
      value={noteText}
      onChange={handleChange}
      cols="70"
      rows="3"
      className="my-2 border border-black"
    ></textarea>
    <p className="text-sm mb-2 mt-0 text-gray-500">Characters remaining: {maxCharacters - noteText.length}</p>
    <button
      onClick={handleSubmit}
      className="block px-4 py-2  font-semibold border border-black hover:bg-purple-600 hover:text-white duration-500"
    >
      Submit
    </button>

    <hr className="my-5 border border-slate-200" />
  </div>
  )
}

export default Addnotes