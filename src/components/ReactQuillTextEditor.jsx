import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const handleImageUpload = () => {
  // Placeholder function for handling image uploads
  // const input = document.createElement("input");
  // input.setAttribute("type", "file");
  // input.setAttribute("accept", "image/*");
  // input.click();
  // input.onchange = () => {
  //   const file = input.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64String = reader.result;
  //     // Store the base64 string in local storage
  //     localStorage.setItem("uploadedImage", base64String);
  //     // Insert the base64 string as an image into the editor
  //     const range = this.quill.getSelection();
  //     this.quill.insertEmbed(range.index, "image", base64String);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
};

const ReactQuillTextEditor = ({ newNote, setNewNote }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      value={newNote}
      onChange={setNewNote}
      placeholder="All your notes at a single place. Click on any note to go to a specific timestamp in the video."
      className="quill-editor"
      modules={modules}
      formats={formats}
    />
  );
};

export default ReactQuillTextEditor;
