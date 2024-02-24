import axios from 'axios';
import { useState,useContext } from 'react';
import { toast } from 'react-hot-toast';
import Clintcontex from '../../createContex/Createcontex';



function ReviewForm() {
  const {courseidForReview, userData,setCorseReview} = useContext(Clintcontex);

  console.log(courseidForReview)

  const id = userData._id;
  console.log(id)
  const [reviewText, setReviewText] = useState('');
  const maxCharacters = 200;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacters) {
      setReviewText(text);
    }
  };
  const handleSubmit = async () => {
    // Handle submission of review text
    if(!reviewText && !courseidForReview){
      alert("cant submit");
      return
    };

    const courseId = courseidForReview;

    try {
      console.log('Submitted review:', reviewText);
      const backendResponse = await axios.post('http://localhost:4001/user/addreview', {
        review:reviewText,
        id,
        courseId
      });

    if(backendResponse.data.success){
      toast.success(backendResponse.data.message)
      setCorseReview('')
      setReviewText('')
    }

    } catch (error) {
      toast.error("failed to post review")
    }

  };

  return (
    <div className="px-5">
      <h2 className="my-2">Add Review</h2>
      <textarea
        value={reviewText}
        onChange={handleChange}
        cols="75"
        rows="5"
        className="my-2 border border-black"
      ></textarea>
      <p className="text-sm mb-2 mt-0 text-gray-500">Characters remaining: {maxCharacters - reviewText.length}</p>
      <button
        onClick={handleSubmit}
        className="block px-4 py-2  font-semibold border border-black hover:bg-purple-600 hover:text-white duration-500"
      >
        Submit
      </button>

      <hr className="my-5 border border-slate-200" />
    </div>
  );
}

export default ReviewForm;
