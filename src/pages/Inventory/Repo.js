import React from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import useHttp from "../../hooks/use-http";
import useSuccesPopUp from "../../hooks/use-successPopUp";


const Repo = ({ repoName, repoId, userId, onRemoveRepo }) => {

    const { isLoading, sendRequest } = useHttp();
    const [shareModalIsOpen, setShareModalIsOpen] = React.useState(false);


    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(onRemoveRepo);


    const requestDeleteRrepo = (repoName, repoId) => {

        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        const requestConfig = {
            action: "deleteUserRepo",
            path: `${userId}/repos/${repoName}`,
            data: {},
        };

        sendRequest(requestConfig, dataHandler);
    };

    const ShareRepo = () => {

        return (
            <div>{repoId}</div>
        );
    };

    return (
        <>
            {shareModalIsOpen && <Modal onClose={() => setShareModalIsOpen(false)}>
                <ShareRepo />
            </Modal>}
            {modalIsOpen && requestIsFinished && <Modal >
                <SuccessPopUp message={`Succesfuly removed ${repoName} from inventory`} />
            </Modal>}
            {modalIsOpen && !requestIsFinished && <Modal onClose={() => setModalIsOpen(false)} >
                <div className="confirm-action">
                    <div className="confirm-action-message">
                        <h3>Are you shure you want to delete {repoName}</h3>
                    </div>
                    <div className="confirm-action-btns">
                        <div className="confirm-action-btns-card">
                            <button className="confirm-action-btns-cancel" onClick={() => setModalIsOpen(false)} >Cancel</button>
                        </div>
                        <div className="confirm-action-btns-card">
                            <button className="confirm-action-btns-yes" onClick={requestDeleteRrepo.bind(null,repoName, repoId)} >YES</button>
                        </div>
                    </div>
                </div>
            </Modal>}
            <div className="repo-card">
                <div className="repo-name" >
                    <Link to={`/inventory/${repoId}`} state={{ repoName: repoName }}>{repoName}</Link>
                </div>
                <section className="repo-btns" >
                    <div className="repo-btn-share" >
                        <button onClick={() => setShareModalIsOpen(true)} >Share Repo</button>
                    </div>
                    <div className="repo-btn-delete" >
                        <button onClick={() => setModalIsOpen(true)} >DELETE</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Repo;