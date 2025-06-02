// countries-data.js
(function(window) {
    'use strict';
    
    // Store the loaded data
    let countriesData = null;
    let isLoading = false;
    let callbacks = [];
    
    // API methods
    const CountriesAPI = {
        // Initialize and load data
        init: function(callback) {
            if (countriesData) {
                callback(null, countriesData);
                return;
            }
            
            if (isLoading) {
                callbacks.push(callback);
                return;
            }
            
            isLoading = true;
            callbacks.push(callback);
            
            fetch('https://your-cdn-domain.com/path/to/countries.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    countriesData = data;
                    isLoading = false;
                    callbacks.forEach(cb => cb(null, data));
                    callbacks = [];
                })
                .catch(error => {
                    isLoading = false;
                    callbacks.forEach(cb => cb(error, null));
                    callbacks = [];
                });
        },
        
        // Get all countries
        getAllCountries: function(callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                callback(null, data);
            });
        },
        
        // Get country by ISO2 code
        getCountryByIso2: function(iso2, callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                
                const country = data.find(c => c.iso2 === iso2.toUpperCase());
                callback(null, country || null);
            });
        },
        
        // Get country by ISO3 code
        getCountryByIso3: function(iso3, callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                
                const country = data.find(c => c.iso3 === iso3.toUpperCase());
                callback(null, country || null);
            });
        },
        
        // Get country by name
        getCountryByName: function(name, callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                
                const country = data.find(c => 
                    c.name.toLowerCase() === name.toLowerCase()
                );
                callback(null, country || null);
            });
        },
        
        // Get all states for a country
        getStatesByCountry: function(countryIdentifier, callback) {
            this._getCountry(countryIdentifier, (err, country) => {
                if (err) return callback(err, null);
                callback(null, country ? country.states : []);
            });
        },
        
        // Get state by state code
        getStateByCode: function(countryIdentifier, stateCode, callback) {
            this.getStatesByCountry(countryIdentifier, (err, states) => {
                if (err) return callback(err, null);
                
                const state = states.find(s => 
                    s.state_code === stateCode.toUpperCase()
                );
                callback(null, state || null);
            });
        },
        
        // Get cities for a state
        getCitiesByState: function(countryIdentifier, stateCode, callback) {
            this.getStateByCode(countryIdentifier, stateCode, (err, state) => {
                if (err) return callback(err, null);
                callback(null, state ? state.cities : []);
            });
        },
        
        // Get city by name
        getCityByName: function(countryIdentifier, stateCode, cityName, callback) {
            this.getCitiesByState(countryIdentifier, stateCode, (err, cities) => {
                if (err) return callback(err, null);
                
                const city = cities.find(c => 
                    c.name.toLowerCase() === cityName.toLowerCase()
                );
                callback(null, city || null);
            });
        },
        
        // Search across all data
        search: function(query, callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                
                const results = [];
                const lowerQuery = query.toLowerCase();
                
                data.forEach(country => {
                    // Check country
                    if (country.name.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            type: 'country',
                            data: country
                        });
                    }
                    
                    // Check states
                    if (country.states) {
                        country.states.forEach(state => {
                            if (state.name.toLowerCase().includes(lowerQuery) || 
                                state.state_code.toLowerCase().includes(lowerQuery)) {
                                results.push({
                                    type: 'state',
                                    country: country,
                                    data: state
                                });
                            }
                            
                            // Check cities
                            if (state.cities) {
                                state.cities.forEach(city => {
                                    if (city.name.toLowerCase().includes(lowerQuery)) {
                                        results.push({
                                            type: 'city',
                                            country: country,
                                            state: state,
                                            data: city
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                
                callback(null, results);
            });
        },
        
        // Helper method to get country by various identifiers
        _getCountry: function(identifier, callback) {
            this.init((err, data) => {
                if (err) return callback(err, null);
                
                if (!identifier) {
                    // If you want to return all countries when no identifier is provided
                    callback(null, data);
                    return;
                }
                
                if (typeof identifier === 'string') {
                    if (identifier.length === 2) {
                        this.getCountryByIso2(identifier, callback);
                        return;
                    }
                    if (identifier.length === 3) {
                        this.getCountryByIso3(identifier, callback);
                        return;
                    }
                    this.getCountryByName(identifier, callback);
                    return;
                }
                
                // If identifier is an object (already a country)
                callback(null, identifier);
            });
        }
    };

    // Expose the API to the global scope
    if (typeof window.CountriesData === 'undefined') {
        window.CountriesData = CountriesAPI;
    }
})(window);