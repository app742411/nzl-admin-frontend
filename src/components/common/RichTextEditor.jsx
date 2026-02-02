import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function TextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="nxwx6a9kwrbe38oujhi9dc8zg49h8j2ccodvtymvhehlsadp"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height: 400,
        menubar: true,
        branding: false,
        promotion: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "emoticons",
          "codesample",
          "pagebreak",
          "hr",
        ],
        toolbar: `
          undo redo | blocks fontfamily fontsize | bold italic underline strikethrough |
          forecolor backcolor | alignleft aligncenter alignright alignjustify |
          bullist numlist outdent indent | table | link image media emoticons hr pagebreak |
          code fullscreen preview
        `,
        font_family_formats:
          "Arial=arial,helvetica,sans-serif;" +
          "Courier New=courier new,courier,monospace;" +
          "Roboto=Roboto,sans-serif;" +
          "Poppins=Poppins,sans-serif;",
        fontsize_formats:
          "10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px",

        image_caption: true,
        automatic_uploads: true,
        file_picker_types: "image",

        /* File/Image Picker */
        file_picker_callback: (callback) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function () {
              callback(reader.result, { alt: file.name });
            };

            reader.readAsDataURL(file);
          };

          input.click();
        },

        content_style: `
          body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }
          img { max-width: 100%; height: auto; }
        `,
      }}
    />
  );
}
