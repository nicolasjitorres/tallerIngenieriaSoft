package com.webienestar.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.webienestar.modelos.Empleado;
import com.webienestar.modelos.Estudiante;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.lang.Function;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private static final String SECRET_KEY ="586E3272357538782F413F4428472B4B62506553685668597033733676397924";
    
    public String getTokenEstudiante(Estudiante estudiante){
        return getTokenEst(new HashMap<>(), estudiante);
    }

    private String getTokenEst(Map<String, Object> extraClaims, Estudiante estudiante) {
        return Jwts
            .builder()
            .claims(extraClaims)
            .claim("estudianteId", estudiante.getId())
            .claim("rol", estudiante.getRol())
            .subject(estudiante.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis()+100*60*24))
            .signWith(getKey())
            .compact();
    }
    public String getTokenEmpleado(Empleado empleado){
        return getTokenEmpl(new HashMap<>(), empleado);
    }

    private String getTokenEmpl(Map<String, Object> extraClaims, Empleado empleado) {
        return Jwts
            .builder()
            .claims(extraClaims)
            .claim("estudianteId", empleado.getId())
            .claim("rol", empleado.getRol())
            .subject(empleado.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis()+100*60*24))
            .signWith(getKey())
            .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes=Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);   
    }

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);    
    }

    public String getRolFromToken(String token) {
        return getAllClaims(token).get("rol", String.class);  
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Claims getAllClaims(String token){
        return Jwts
            .parser()
            .verifyWith(getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token){
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }
}
