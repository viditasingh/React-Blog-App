import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
      {label && (
        <label className='inline-block text-sm font-medium text-gray-700 mb-2 pl-1'>
          {label}
        </label>
      )}

      <Controller 
        name={name || "content"}
        control={control}
        render={({field: {onChange, value}}) => (
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Editor 
              apiKey="your-tinymce-api-key" // Get free key from TinyMCE
              value={value || defaultValue}
              onEditorChange={onChange}
              init={{
                height: 500,
                menubar: 'file edit view insert format tools table help',
                branding: false,
                
                // Core Plugins
                plugins: [
                  // Text formatting
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
                  
                  // Advanced features
                  'autoresize', 'codesample', 'emoticons', 'hr', 'pagebreak',
                  'nonbreaking', 'toc', 'visualchars', 'quickbars',
                  
                  // Collaboration (if needed)
                  'autosave', 'save'
                ],
                
                // Toolbar configuration
                toolbar: `
                  undo redo | blocks fontfamily fontsize | 
                  bold italic underline strikethrough | 
                  fontcolor backcolor | 
                  alignleft aligncenter alignright alignjustify | 
                  bullist numlist outdent indent | 
                  removeformat | 
                  table link image media codesample | 
                  emoticons charmap | 
                  fullscreen preview save | 
                  help
                `,
                // Content styling
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 1rem;
                  }
                `,
                
                // Image handling
                image_advtab: true,
                image_caption: true,
                image_uploadtab: true,
                
                // Link settings
                link_assume_external_targets: true,
                link_context_toolbar: true,
                
                // Table settings
                table_responsive_width: true,
                table_grid: false,
                
                // Code sample languages
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'PHP', value: 'php'},
                  {text: 'Ruby', value: 'ruby'},
                  {text: 'Python', value: 'python'},
                  {text: 'Java', value: 'java'},
                  {text: 'C', value: 'c'},
                  {text: 'C#', value: 'csharp'},
                  {text: 'C++', value: 'cpp'},
                  {text: 'JSON', value: 'json'},
                  {text: 'SQL', value: 'sql'}
                ],
                
                // Auto-resize
                autoresize_bottom_margin: 16,
                autoresize_overflow_padding: 50,
                
                // Quick selection toolbar
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                quickbars_insert_toolbar: 'quickimage quicktable',
                
                // Paste settings
                paste_data_images: true,
                paste_as_text: false,
                
                // Spell check
                browser_spellcheck: true,
                
                // Accessibility
                a11y_advanced_options: true,
                
                // Auto-save (optional)
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m'
              }}
            />
          </div>
        )}
      />
    </div>
  )
}