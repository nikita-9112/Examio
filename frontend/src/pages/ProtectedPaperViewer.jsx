import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";

import purchaseService from "../sevices/purchaseService";


// PDF.js worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


const ProtectedPaperViewer = () => {

  const { subjectPackId, paperId } = useParams();
  const navigate = useNavigate();

  const {user} = useAuth();


  const [pdfFile, setPdfFile] = useState(null);

  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(1.2);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const waterMarkText = user?.name 
  ? `Examio • Purchased by ${user.name}`
  : `EXAMIO • PURCHASED CONTENT`;

  // ============================
  // FETCH PROTECTED PDF
  // ============================

  useEffect(() => {

    let blobUrl = null;


    const fetchPaper = async () => {

      try {

        setLoading(true);
        setError("");


        const response =
          await purchaseService.getProtectedPaper(
            subjectPackId,
            paperId
          );


        const blob = new Blob(
          [response.data],
          {
            type: "application/pdf",
          }
        );


        blobUrl = URL.createObjectURL(blob);


        setPdfFile(blobUrl);


      } catch (error) {

        console.error(
          "Error loading protected paper:",
          error
        );


        setError(
          "Unable to load this paper. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPaper();


    // Cleanup Blob URL when component unmounts
    return () => {

      if (blobUrl) {

        URL.revokeObjectURL(blobUrl);

      }

    };

  }, [subjectPackId, paperId]);


  // ============================
  // PDF LOADED
  // ============================

  const onDocumentLoadSuccess = ({
    numPages,
  }) => {

    setNumPages(numPages);

    setPageNumber(1);

  };


  // ============================
  // PAGE CONTROLS
  // ============================

  const goToPreviousPage = () => {

    setPageNumber((currentPage) =>
      Math.max(currentPage - 1, 1)
    );

  };


  const goToNextPage = () => {

    setPageNumber((currentPage) =>
      Math.min(
        currentPage + 1,
        numPages
      )
    );

  };


  // ============================
  // ZOOM CONTROLS
  // ============================

  const zoomIn = () => {

    setScale((currentScale) =>
      Math.min(
        currentScale + 0.2,
        2.5
      )
    );

  };


  const zoomOut = () => {

    setScale((currentScale) =>
      Math.max(
        currentScale - 0.2,
        0.8
      )
    );

  };


  // ============================
  // LOADING SCREEN
  // ============================

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-100
        "
      >

        <div className="flex flex-col items-center gap-4">

          <Loader2
            className="
              h-10
              w-10
              animate-spin
              text-blue-600
            "
          />

          <p className="text-slate-600">
            Loading your paper...
          </p>

        </div>

      </div>

    );

  }


  // ============================
  // ERROR SCREEN
  // ============================

  if (error) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-100
          px-4
        "
      >

        <div
          className="
            max-w-md
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-lg
          "
        >

          <AlertCircle
            className="
              mx-auto
              mb-4
              h-12
              w-12
              text-red-500
            "
          />

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Unable to Load Paper
          </h2>

          <p className="mt-2 text-slate-500">

            {error}

          </p>


          <button
            onClick={() => navigate(-1)}
            className="
              mt-6
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Go Back
          </button>

        </div>

      </div>

    );

  }


  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        select-none
      "

      onContextMenu={(event) =>
        event.preventDefault()
      }
    >


      {/* =========================
          TOP NAVBAR
      ========================= */} 

      <button
        onClick={() => navigate(-1)}
        className="
          fixed
          left-4
          top-20
          z-30
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          bg-white/90
          text-slate-700
          shadow-md
          backdrop-blur
          transition
          hover:scale-105
          hover:bg-white
        "
      >
        <ArrowLeft size={20} />
      </button>


      {/* =========================
          PDF VIEWER AREA
      ========================= */}

      <main
        className="
          flex
          min-h-[calc(100vh-130px)]
          justify-center
          overflow-auto
          px-4
          py-6
        "
      >

        <div
          className="
            relative
            inline-block
          "
        >


          {/* WATERMARK */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            <div
              className="
                -rotate-45
                whitespace-nowrap
                text-3xl
                font-bold
                text-slate-400/20
                sm:text-5xl
              "
            >
              {waterMarkText}
            </div>

          </div>


          {/* PDF */}

          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}

            loading={
              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                "
              >
                <Loader2
                  className="
                    h-8
                    w-8
                    animate-spin
                    text-blue-600
                  "
                />
              </div>
            }

            error={
              <div
                className="
                  rounded-2xl
                  bg-red-50
                  p-6
                  text-red-600
                "
              >
                Failed to render PDF.
              </div>
            }
          >

            <Page
              pageNumber={pageNumber}
              scale={scale}

              renderTextLayer={false}

              renderAnnotationLayer={false}

              className="
                overflow-hidden
                rounded-lg
                shadow-xl
              "
            />

          </Document>


        </div>

      </main>



      {/* =========================
          BOTTOM CONTROLS
      ========================= */}

      <div
        className="
          sticky
          bottom-0
          z-40
          border-t
          border-slate-200
          bg-white
          shadow-lg
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-3xl
            items-center
            justify-between
            gap-3
            px-4
            py-3
          "
        >


          {/* Previous */}

          <button
            onClick={goToPreviousPage}

            disabled={pageNumber <= 1}

            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft size={20} />
          </button>


          {/* Page Counter */}

          <div
            className="
              rounded-xl
              bg-slate-100
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-700
            "
          >

            Page {pageNumber}

            {numPages &&
              ` of ${numPages}`
            }

          </div>


          {/* Next */}

          <button
            onClick={goToNextPage}

            disabled={
              !numPages ||
              pageNumber >= numPages
            }

            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronRight size={20} />
          </button>


          {/* Zoom Out */}

          <button
            onClick={zoomOut}
            className="
              hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-100
              sm:flex
            "
          >
            <ZoomOut size={18} />
          </button>


          {/* Zoom In */}

          <button
            onClick={zoomIn}
            className="
              hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-100
              sm:flex
            "
          >
            <ZoomIn size={18} />
          </button>

        </div>

      </div>

    </div>

  );

};


export default ProtectedPaperViewer;