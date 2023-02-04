import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import QrGenerator from "../QrGenerator/QrGenerator";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import useHttp from "../../hooks/use-http";
import usePopUp from "../../hooks/use-popUp";
import ConfirmPopUp from "../ConfirmPopUp/ConfirmPopUp";


const Repo = ({ repoName, repoId, userId, onRemoveRepo }) => {

    const { sendRequest } = useHttp();
    const [shareModalIsOpen, setShareModalIsOpen] = React.useState(false);


    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(onRemoveRepo);


    const requestDeleteRrepo = (repoId) => {

        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        const requestConfig = {
            action: "deleteUserRepo",
            path: `${userId}/repos/${repoId}`,
            data: {},
        };

        sendRequest(requestConfig, dataHandler);
    };

    const ShareRepo = () => {

        return (
            <QrGenerator value={repoId} link={repoId} />
        );
    };

    return (
        <>
            {shareModalIsOpen &&
                <Modal classes={'qr-modal'} onClose={() => setShareModalIsOpen(false)}>
                    <ShareRepo />
                </Modal>}
            {modalIsOpen && requestIsFinished &&
                <Modal >
                    <SuccessPopUp message={`Succesfuly removed ${repoName} from inventory`} />
                </Modal>}
            {modalIsOpen && !requestIsFinished &&
                <Modal onClose={() => setModalIsOpen(false)} >
                    <ConfirmPopUp
                        name={repoName}
                        onCancelHandler={() => setModalIsOpen(false)}
                        onCinfirmHandler={requestDeleteRrepo.bind(null, repoId)}
                    />
                </Modal>}
            <div className="repo-card">
                <div className="repo-name" >
                    <Link to={`/repo/${repoId}/items`} state={{ repoName: repoName }}>{repoName}</Link>
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