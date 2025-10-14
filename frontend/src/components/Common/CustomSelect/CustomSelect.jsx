// import React, { useEffect, useRef } from "react";

// export default function CustomSelect({
//   label,
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select option",
//   required = false,
//   id,
//   multiple = false,
//   disabled = false,
// }) {
//   const selectRef = useRef();
//   const containerRef = useRef();
//   const initialized = useRef(false);

//   // Initialize Select2 once
//   useEffect(() => {
//     const $el = $(selectRef.current);

//     if ($el.length && !initialized.current) {
//       $el.select2({
//         placeholder,
//         width: "100%",
//         dropdownParent: containerRef.current,
//       });

//       initialized.current = true;

//       // Attach change handler
//       $el.on("change.select2-custom", (e) => {
//         const selectedValues = $(e.target).val();
//         if (onChange) {
//           onChange(multiple ? selectedValues || [] : selectedValues || "");
//         }
//       });
//     }

//     return () => {
//       if (initialized.current && $el.data("select2")) {
//         $el.off("change.select2-custom");
//         $el.select2("destroy");
//         initialized.current = false;
//       }
//     };
//   }, [onChange, multiple, placeholder]);

//   // Sync external value → Select2
//   useEffect(() => {
//     if (initialized.current && selectRef.current) {
//       const $el = $(selectRef.current);
//       $el.val(value).trigger("change.select2"); // ✅ sync without infinite loop
//     }
//   }, [value]);

//   return (
//     <div ref={containerRef}>
//       {label && (
//         <label className="form-label" htmlFor={id}>
//           {label}
//           {/* {required && <span className="text-danger">*</span>} */}
//         </label>
//       )}

//       <select
//         id={id}
//         ref={selectRef}
//         className="form-select"
//         defaultValue={value || (multiple ? [] : "")}
//         multiple={multiple}
//         disabled={disabled}
//       >
//         {!multiple && <option value="">{placeholder}</option>}
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// import React, { useEffect, useRef } from "react";

// export default function CustomSelect({
//   label,
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select option",
//   required = false,
//   id,
//   multiple = false,
//   disabled = false,
// }) {
//   const selectRef = useRef();
//   const containerRef = useRef();
//   const initialized = useRef(false);

//   // Initialize Select2 once
//   useEffect(() => {
//     const $el = $(selectRef.current);

//     if ($el.length && !initialized.current) {
//       $el.select2({
//         placeholder,
//         width: "100%",
//         dropdownParent: containerRef.current,
//       });

//       initialized.current = true;

//       // Attach change handler
//       $el.on("change.select2-custom", (e) => {
//         const selectedValues = $(e.target).val();
//         if (onChange) {
//           onChange(multiple ? selectedValues || [] : selectedValues || "");
//         }
//       });
//     }

//     return () => {
//       if (initialized.current && $el.data("select2")) {
//         $el.off("change.select2-custom");
//         $el.select2("destroy");
//         initialized.current = false;
//       }
//     };
//   }, [onChange, multiple, placeholder]);

//   // Sync external value → Select2
//   useEffect(() => {
//     if (initialized.current && selectRef.current) {
//       const $el = $(selectRef.current);
//       $el.val(value).trigger("change.select2");
//     }
//   }, [value]);

//   return (
//     <div ref={containerRef}>
//       {label && (
//         <label className="form-label" htmlFor={id}>
//           {label}
//           {/* {required && <span className="text-danger">*</span>} */}
//         </label>
//       )}

//       <select
//         id={id}
//         ref={selectRef}
//         className="form-select"
//         value={value || (multiple ? [] : "")}
//         multiple={multiple}
//         disabled={disabled}
//       >
//         {!multiple && <option value="">{placeholder}</option>}
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

///////

import React, { useEffect, useRef } from "react";

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  required = false,
  id,
  multiple = false,
  disabled = false,
}) {
  const selectRef = useRef();
  const containerRef = useRef();
  const initialized = useRef(false);

  // Initialize Select2 once
  useEffect(() => {
    const $el = $(selectRef.current);

    if ($el.length && !initialized.current) {
      $el.select2({
        placeholder,
        width: "100%",
        dropdownParent: containerRef.current,
      });

      initialized.current = true;

      // Attach change handler (jQuery → React)
      $el.on("change.select2-custom", (e) => {
        const selectedValues = $(e.target).val();
        if (onChange) {
          onChange(multiple ? selectedValues || [] : selectedValues || "");
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (initialized.current && $el.data("select2")) {
        $el.off("change.select2-custom");
        $el.select2("destroy");
        initialized.current = false;
      }
    };
  }, [onChange, multiple, placeholder]);

  // Sync external value → Select2
  useEffect(() => {
    if (initialized.current && selectRef.current) {
      const $el = $(selectRef.current);
      $el.val(value).trigger("change.select2");
    }
  }, [value]);

  return (
    <>
      {/* <style>
        {`
        .select2-selection select2-selection--single{
        width:"150px !important";
        }
        `}
      </style> */}
      <div ref={containerRef}>
        {label && (
          <label className="form-label" htmlFor={id}>
            {label}
            {/* {required && <span className="text-danger">*</span>} */}
          </label>
        )}

        <select
          id={id}
          ref={selectRef}
          className="form-select"
          value={value || (multiple ? [] : "")}
          multiple={multiple}
          disabled={disabled}
          // ✅ Added to prevent React warning (since Select2 handles changes)
          onChange={() => {}}
        >
          {!multiple && <option value="">{placeholder}</option>}
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
