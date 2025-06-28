import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'
import config from '../config/config.js'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
      {label && (
      <label className='inline-block text-sm font-medium text-gray-700 mb-2 pl-1 transition-colors duration-200 hover:text-gray-900'>
          {label}
          <span className="text-red-500 ml-1 font-semibold">*</span> {/* Content is always required */}
      </label>
      )}

      <Controller 
        name={name || "content"}
        control={control}
        render={({field: {onChange, value}}) => (
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Editor 
              apiKey={config.tinymce_api}
              value={value || defaultValue}
              onEditorChange={onChange}
              init={{
                // Basic Configuration
                height: 500,
                menubar: 'file edit view insert format tools table help',
                branding: false,
                promotion: false,
                
                // Modern Plugin Set
                plugins: [
                  'advlist', 'anchor', 'autolink', 'autoresize', 'autosave',
                  'charmap', 'code', 'codesample', 'directionality', 'emoticons',
                  'fullscreen', 'help', 'image', 'importcss', 'insertdatetime',
                  'link', 'lists', 'media', 'nonbreaking', 'pagebreak', 'preview',
                  'quickbars', 'save', 'searchreplace', 'table', 'template',
                  'visualblocks', 'visualchars', 'wordcount'
                ],
                
                // Modern Toolbar Layout
                toolbar_mode: 'sliding',
                toolbar: [
                  'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify',
                  'bullist numlist outdent indent | link image media table | code codesample | emoticons charmap | fullscreen preview'
                ],
                
                // Content Styling
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                    max-width: 100%;
                    margin: 1rem;
                  }
                  
                  h1 { font-size: 2em; margin: 0.67em 0; }
                  h2 { font-size: 1.5em; margin: 0.75em 0; }
                  h3 { font-size: 1.17em; margin: 0.83em 0; }
                  h4 { font-size: 1em; margin: 1.12em 0; }
                  h5 { font-size: 0.83em; margin: 1.5em 0; }
                  h6 { font-size: 0.75em; margin: 1.67em 0; }
                  
                  p { margin: 1em 0; }
                  
                  blockquote {
                    border-left: 4px solid #ddd;
                    margin: 1.5em 0;
                    padding: 0.5em 0 0.5em 1em;
                    font-style: italic;
                  }
                  
                  code {
                    background-color: #f4f4f4;
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                  }
                  
                  pre {
                    background-color: #f4f4f4;
                    padding: 1em;
                    border-radius: 5px;
                    overflow-x: auto;
                  }
                  
                  img {
                    max-width: 100%;
                    height: auto;
                  }
                  
                  table {
                    border-collapse: collapse;
                    width: 100%;
                  }
                  
                  table, th, td {
                    border: 1px solid #ddd;
                  }
                  
                  th, td {
                    padding: 8px 12px;
                    text-align: left;
                  }
                  
                  th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                  }
                `,
                
                // Modern Styles Format
                style_formats: [
                  {
                    title: 'Headings',
                    items: [
                      { title: 'Heading 1', format: 'h1' },
                      { title: 'Heading 2', format: 'h2' },
                      { title: 'Heading 3', format: 'h3' },
                      { title: 'Heading 4', format: 'h4' },
                      { title: 'Heading 5', format: 'h5' },
                      { title: 'Heading 6', format: 'h6' }
                    ]
                  },
                  {
                    title: 'Inline',
                    items: [
                      { title: 'Bold', format: 'bold' },
                      { title: 'Italic', format: 'italic' },
                      { title: 'Underline', format: 'underline' },
                      { title: 'Strikethrough', format: 'strikethrough' },
                      { title: 'Code', format: 'code' }
                    ]
                  },
                  {
                    title: 'Blocks',
                    items: [
                      { title: 'Paragraph', format: 'p' },
                      { title: 'Blockquote', format: 'blockquote' },
                      { title: 'Div', format: 'div' },
                      { title: 'Pre', format: 'pre' }
                    ]
                  }
                ],
                
                // Image Configuration
                image_uploadtab: true,
                image_advtab: true,
                image_caption: true,
                image_title: true,
                
                // Link Configuration
                link_default_target: '_blank',
                link_assume_external_targets: 'https',
                link_context_toolbar: true,
                
                // Table Configuration
                table_use_colgroups: true,
                table_responsive_width: true,
                table_default_attributes: {
                  border: '1'
                },
                table_default_styles: {
                  'border-collapse': 'collapse'
                },
                
                // Code Sample Configuration
                codesample_languages: [
                  { text: 'HTML/XML', value: 'markup' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'TypeScript', value: 'typescript' },
                  { text: 'CSS', value: 'css' },
                  { text: 'SCSS', value: 'scss' },
                  { text: 'Python', value: 'python' },
                  { text: 'Java', value: 'java' },
                  { text: 'C++', value: 'cpp' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Go', value: 'go' },
                  { text: 'Rust', value: 'rust' },
                  { text: 'JSON', value: 'json' },
                  { text: 'SQL', value: 'sql' },
                  { text: 'Bash', value: 'bash' }
                ],
                codesample_global_prismjs: true,
                
                // Auto-resize Configuration
                autoresize_bottom_margin: 50,
                autoresize_overflow_padding: 50,
                min_height: 400,
                max_height: 800,
                
                // Quickbars Configuration
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                quickbars_insert_toolbar: 'quickimage quicktable',
                
                // Paste Configuration
                paste_data_images: true,
                paste_as_text: false,
                paste_webkit_styles: 'none',
                paste_remove_styles_if_webkit: true,
                
                // Auto-save Configuration
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                
                // Advanced Options
                browser_spellcheck: true,
                contextmenu: 'link image table',
                
                // Accessibility
                a11y_advanced_options: true,
                
                // Performance
                convert_urls: false,
                
                // Mobile Configuration
                mobile: {
                  toolbar_mode: 'scrolling'
                },
                
                // File Picker (if you want custom file upload)
                file_picker_callback: function(callback, value, meta) {
                  // Custom file picker implementation
                  if (meta.filetype === 'image') {
                    // Handle image uploads
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    
                    input.onchange = function() {
                      const file = this.files[0];
                      if (file) {
                        // Here you would upload the file to your server
                        // For now, we'll create a local URL
                        const reader = new FileReader();
                        reader.onload = function(e) {
                          callback(e.target.result, {
                            alt: file.name
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    
                    input.click();
                  }
                },
                
                // Setup callback
                setup: function(editor) {
                  editor.on('init', function() {
                    console.log('TinyMCE Editor initialized');
                  });
                  
                  editor.on('change', function() {
                    editor.save();
                  });
                }
              }}
            />
          </div>
        )}
      />
    </div>
  )
}