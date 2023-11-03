import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51O82jnCcAbs5JGsex63PvVtptGN0pAZtd13Xhe2SS1SlSOlnWiB0KEbmI1yLil9CeuV0x4bbp6hFaZonKoWY1Q0H00ndwKX36R'
);

export const bookTour = async tourId => {
  try {
    // Get checkout session from API
    const session = await axios(`http://127.0.0.1:7000/api/v1/bookings/checkout-session/${tourId}`);
    // Create checkout form + charge cart
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
