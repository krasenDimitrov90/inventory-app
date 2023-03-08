import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import QrGenerator from "../QrGenerator/QrGenerator";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import useHttp from "../../hooks/use-http";
import usePopUp from "../../hooks/use-popUp";
import ConfirmPopUp from "../ConfirmPopUp/ConfirmPopUp";
import svg from "../../SVG";
import './Repo.styles.scss';


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
            <ul className="main-repo-list">
                <li className="flex-1">

                    <Link to={`/repo/${repoId}/items`} state={{ repoName: repoName }} className="actions-links edit ">
                        {repoName}
                    </Link>
                    
                </li>
                <li className="flex-1">
                    <div className="actions-icons-wrapper">
                        <Link to={`edit-repo/${repoId}`} className="actions-links edit">
                            <svg.Pen />
                        </Link>
                        <button onClick={() => setModalIsOpen(true)} className="actions-links delete">
                            <svg.Delete />
                        </button>
                        <button onClick={() => setShareModalIsOpen(true)} className="actions-links share">
                            <svg.Share />
                        </button>

                    </div>
                </li>
            </ul>
        </>
    );
};

export default Repo;