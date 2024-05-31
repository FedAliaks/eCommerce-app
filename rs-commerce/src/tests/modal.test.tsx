import { fireEvent, render, screen } from '@testing-library/react';
import Modal from 'components/modal/Modal';
import { vi } from 'vitest';

describe('Modal check', () => {
  it('should render modal with children', async () => {
    const text = 'This is some content inside the modal';
    const closeModal = vi.fn();

    render(
      <Modal onClose={closeModal}>
        <p>{text}</p>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const modalContent = screen.getByText(text);
    expect(modalContent).toBeInTheDocument();

    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      expect(closeModal).toHaveBeenCalledTimes(1);
    }
  });
});
