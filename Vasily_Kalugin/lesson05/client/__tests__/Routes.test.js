import React from 'react';
import { MemoryRouter } from 'react-router';

import Routes from '../Routes';
import TestApp from '../testComponent/TestApp';

describe('main routes', () => {
    it('should show Test component for "/" router', () => {
        const component = mount(
            <MemoryRouter initialEntries={['/']}>
                <Routes />
            </MemoryRouter>,
        );
        expect(component.find(TestApp)).toHaveLength(1);
    });
});
