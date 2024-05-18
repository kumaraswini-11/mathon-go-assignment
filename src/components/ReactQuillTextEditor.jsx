import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillTextEditor = ({ newNote, setNewNote }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
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
    "indent",
    "link",
    "image",
    "video",
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
