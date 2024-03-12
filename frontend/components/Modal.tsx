import { createPortal } from 'react-dom';
import { ModalProps } from '@/helpers/types';

const Modal = ({ tamano, onClose, children }: ModalProps) => {
	const handleCloseClick = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		onClose();
	};
	const portalDiv = document.getElementById('modal')!;
	const tamanoModal = tamano || 'lg';
	const claseModal = {
		sm: 'w-[240px] h-[180px] md:w-[360px] md:h-[180px]',
		md: 'w-[360px] h-[360px] md:w-[480px] md:h-[480px]',
		lg: 'w-[450px] h-[550px] md:w-[650px] md:h-[600px]',
	};

	const modalContent = (
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className={`${claseModal[tamanoModal]}`}>
				<div className="relative bg-white h-full w-full rounded-lg p-2">
					<div className="absolute inset-y-2 right-2 z-20">
						<button
							onClick={handleCloseClick}
							className="px-2 py-1 text-white bg-stone-500 hover:bg-stone-700 rounded-lg text-xs md:text-sm"
						>
							X
						</button>
					</div>
					<div className="h-full flex items-center justify-center">
						<div className="w-full h-full pt-2 px-4">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(modalContent, portalDiv);
};

export default Modal;
