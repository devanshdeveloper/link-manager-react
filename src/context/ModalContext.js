import { createContext, useState } from "react";
import AddLinkModal from "../components/modals/AddLinkModal";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";

export const ModalContext = createContext();
export const ModalProvider = ({ children }) => {
  const [showAddLink, setShowAddLink] = useState([false, null]);
  const [showAddCategory, setShowAddCategory] = useState([false, null]);
  const [showConfirmationModal, setShowConfirmationModal] = useState({
    show: false,
  });
  const dataValue = {
    showAddLink(defaultValues) {
      setShowAddLink([true, defaultValues]);
    },
    showAddCategory(defaultValues) {
      setShowAddCategory([true, defaultValues]);
    },
    confirmModal(data) {
      setShowConfirmationModal({ show: true, ...data });
    },
  };
  return (
    <ModalContext.Provider value={dataValue}>
      {children}
      <AddLinkModal
        show={showAddLink[0]}
        defaultValues={showAddLink[1]}
        handleClose={() => setShowAddLink([false, null])}
      />
      <AddCategoryModal
        show={showAddCategory[0]}
        defaultValues={showAddCategory[1]}
        handleClose={() => setShowAddCategory([false, null])}
      />
      <ConfirmationModal
        data={{
          ...showConfirmationModal,
          handleClose() {
            setShowConfirmationModal({ show: false });
          },
        }}
      />
    </ModalContext.Provider>
  );
};
