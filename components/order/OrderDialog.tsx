import { Listing } from '.prisma/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useCreateOrder } from '../../lib/frontend/data';

interface OrderDialogProps {
    onClose: () => any;
    isOpen: boolean;
    listing: Listing;
}

export const OrderDialog = ({ isOpen, listing, onClose }: OrderDialogProps) => {
    const { createOrder, isLoading: isCreateOrderLoading } = useCreateOrder()
    const [isLastOrderSuccessful, setIsLastOrderSuccessful] = useState(false)

    const handleClick = useCallback(async () => {
        if (!listing) return;

        const createOrderResult = await createOrder(listing.id)

        if (!createOrderResult) return;

        setIsLastOrderSuccessful(true);

        setTimeout(() => {
            setIsLastOrderSuccessful(false)
            onClose()
        }, 1000)
    }, [createOrder, listing, onClose])

    return (
        <Dialog
            onClose={onClose}
            open={isOpen}
        >
            <DialogTitle>
                Confirm Order
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Are you sure you would like to order: {listing.title}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button autoFocus onClick={handleClick} disabled={isCreateOrderLoading || isLastOrderSuccessful}>
                    {isLastOrderSuccessful ? 'Order Complete!' : isCreateOrderLoading ? 'Ordering...' : 'Yes, order it!'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}