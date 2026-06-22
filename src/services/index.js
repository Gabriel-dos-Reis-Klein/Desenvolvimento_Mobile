export { default as customerService } 
    from './customers/customer.service';

export { default as orderService } 
    from './orders/order.service';

export { default as userService }
    from './users/user.service';

import * as authStorage from './storage/auth.storage';
export { authStorage };