// import React, { useEffect, useRef } from "react";

// export default function CustomSelect({
//   label,
//   options = [],
//   value,
//   onChange,
//   placeholder = "Select option",
//   required = false,
//   id,
// }) {
//   const selectRef = useRef();

//   useEffect(() => {
//     const $el = $(selectRef.current);

//     // Initialize select2
//     $el.select2({
//       placeholder,
//       width: "1px",
//     });

//     //   $el.select2({
//     //   placeholder,
//     //   width: "100%",
//     //   templateSelection: (data) => {
//     //     if (!data.id) {
//     //       // When it's the placeholder, force it to render with the same class
//     //       return $(
//     //         `<span class="select2-selection__rendered">${placeholder}</span>`
//     //       );
//     //     }
//     //     return data.text;
//     //   },
//     // });

//     // Set initial value
//     if (value) {
//       $el.val(value).trigger("change");
//     }

//     // Handle change
//     $el.on("change", (e) => {
//       if (onChange) {
//         onChange(e.target.value);
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       $el.select2("destroy");
//     };
//   }, [value, onChange, placeholder]);

//   return (
//     <div>
//       {label && (
//         <label className="form-label" htmlFor={id}>
//           {label} {required && <span className="text-danger">*</span>}
//         </label>
//       )}

//       <select
//         id={id}
//         ref={selectRef}
//         className="select2 form-select select2-hidden-accessible"
//         data-select2-id={id}
//         tabIndex="-1"
//         aria-hidden="true"
//         defaultValue={value || ""}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value} data-select2-id={idx + 1}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  required = false,
  id,
}) {
  const selectRef = useRef();
  const containerRef = useRef();
  const select2Initialized = useRef(false);

  useEffect(() => {
    const $el = $(selectRef.current);

    // Check if element exists and Select2 hasn't been initialized yet
    if ($el.length && !select2Initialized.current) {
      try {
        // Initialize select2
        $el.select2({
          placeholder,
          width: "100%",
          dropdownParent: containerRef.current,
        });

        select2Initialized.current = true;

        // Set initial value
        if (value) {
          $el.val(value).trigger("change");
        }

        // Handle change
        $el.on("change.select2-custom", (e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        });
      } catch (error) {
        console.error("Select2 initialization failed:", error);
      }
    }

    // Cleanup on unmount
    return () => {
      if (select2Initialized.current && $el.length) {
        try {
          // Check if Select2 is actually initialized on this element
          if ($el.data("select2")) {
            $el.off("change.select2-custom"); // Remove our specific event listener
            $el.select2("destroy");
          }
        } catch (error) {
          console.warn("Select2 destruction failed:", error);
        } finally {
          select2Initialized.current = false;
        }
      }
    };
  }, [value, onChange, placeholder]);

  // Additional useEffect to handle value changes after initialization
  useEffect(() => {
    if (select2Initialized.current && selectRef.current) {
      const $el = $(selectRef.current);
      if ($el.length && value !== undefined) {
        $el.val(value).trigger("change");
      }
    }
  }, [value]);

  return (
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
        defaultValue={value || ""}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value} data-select2-id={idx + 1}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
