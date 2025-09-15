import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, computed, signal,OnDestroy,ViewChildren, QueryList, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeferRenderDirective } from '../../shared/defer-render.directive';
// importe SEM .local para funcionar em local e produção via fileReplacements
import { environment } from '../../../environments/environment';
import { LightboxComponent } from '../../shared/lightbox-servicos/lightbox.component';
import { FooterComponent } from "../footer/footer.component";

interface Servico {
  icon: string;
  titulo: string;
  descricao: string;
  imgs: string[];
}
  type Depo = { nome: string; origem: string; texto: string; nota: number; avatar: string; };
  type Parceiro = { nome: string; logo: string; url?: string };
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, DeferRenderDirective, LightboxComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef<HTMLDivElement>;

  readonly empresa = 'Master Vidros';
  readonly whatsapp = environment.whatsappNumber;
  readonly mensagem = environment.whatsappMsg;

  isScrolled = false;

@HostListener('window:scroll')
onScroll() {
  this.isScrolled = window.scrollY > 8;
}



depoimentos = signal<Depo[]>([
  {
    nome: 'Juliana M.',
    origem: 'Google',
    texto: 'Atendimento excelente e acabamento perfeito no meu box.',
    nota: 5,
    avatar: 'https://i.pravatar.cc/80?img=32'
  },
  {
    nome: 'Carlos A.',
    origem: 'Google',
    texto: 'Instalaram a fachada da minha loja dentro do prazo e com muita qualidade.',
    nota: 5,
    avatar: 'https://i.pravatar.cc/80?img=12'
  },
  {
    nome: 'Fernanda R.',
    origem: 'Google',
    texto: 'Equipe caprichosa! Espelhos e divisórias ficaram impecáveis.',
    nota: 5,
    avatar: 'https://i.pravatar.cc/80?img=45'
  },
  {
    nome: 'Bruna T.',
    origem: 'Google',
    texto: 'Guarda-corpo com ótimo acabamento. Recomendo.',
    nota: 5,
    avatar: 'https://i.pravatar.cc/80?img=5'
  }
]);
  // catálogo de serviços
servicos = signal<Servico[]>([
  // ===== seus 3 novos =====
  {
    icon: 'bi bi-columns-gap',
    titulo: 'Cortinas de Vidro (Sacadas)',
    descricao:
      'Envidraçamento que integra ambientes e protege do vento e da chuva. Perfis discretos, sistema com ou sem roldanas e vidro temperado 8/10 mm; travas de segurança e ventilação controlada.',
    imgs: [
      'assets/servicos/cortinas/FOTO-1.jpeg',
      'assets/servicos/cortinas/FOTO-2.jpeg',
      'assets/servicos/cortinas/FOTO-3.jpeg',
    ],
  },
  {
    icon: 'bi bi-tools',
    titulo: 'Manutenção — Cortinas, Janelas e Box',
    descricao:
      'Troca de roldanas, manutenção e regulagem de cortinas de vidro, portas e janelas, vedação contra vazamentos e substituição de vidros trincados. Atendimento personalizado e garantia de serviço.',
    imgs: [
      'assets/servicos/cortinas/01.jpg',
      'assets/servicos/manutencao/02.jpg',
      'assets/servicos/manutencao/03.jpg',
    ],
  },
  {
    icon: 'bi bi-box-seam',
    titulo: 'Vidros para Prateleiras e Fechamentos',
    descricao:
      'Prateleiras sob medida em vidro temperado ou comum, com lapidação, bisotê e jateamento. Suportes discretos, fechamento de nichos e vitrines com segurança e excelente acabamento.',
    imgs: [
      'assets/servicos/prateleiras/FOTO (4).jpeg',
      'assets/servicos/prateleiras/FOTO (5).jpeg',
      'assets/servicos/prateleiras/FOTO (6).jpeg',
      'assets/servicos/prateleiras/FOTO (8).jpeg',
      'assets/servicos/prateleiras/FOTO (9).jpeg',
    ],
  },

  // ===== 6 da imagem (mantidos) =====
  {
    icon: 'bi bi-door-closed',
    titulo: 'Box para Banheiro',
    descricao:
      'Box sob medida em vidro temperado (8/10mm), ferragens premium e vedação perfeita.',
    imgs: [
      'assets/servicos/box/1.jpeg',
      'assets/servicos/box/2.jpeg'

    ],
  },
  {
    icon: 'bi bi-aspect-ratio',
    titulo: 'Espelhos Decorativos',
    descricao:
      'Espelhos lapidados, bisotê e antiembaçantes para hall, salas e banheiros.',
    imgs: [
      'assets/servicos/espelhos/FOTO (1).jpeg',
      'assets/servicos/espelhos/FOTO (2).jpeg',
      'assets/servicos/espelhos/FOTO (3).jpeg',
      'assets/servicos/espelhos/FOTO (4).jpeg',
      'assets/servicos/espelhos/FOTO (5).jpeg',
      'assets/servicos/espelhos/FOTO (6).jpeg'
    ],
  },
  {
    icon: 'bi bi-building',
    titulo: 'Fachadas em Vidro',
    descricao:
      'Pele de vidro, guarda-corpos e envidraçamento de sacadas com segurança e elegância.',
    imgs: [
      'assets/servicos/fachadas/FOTO (4).jpeg',
      'assets/servicos/fachadas/FOTO (1).jpeg',
      'assets/servicos/fachadas/FOTO (2).jpeg',
      'assets/servicos/fachadas/FOTO (3).jpeg'

    ],
  },
  {
    icon: 'bi bi-border',
    titulo: 'Guarda-corpo',
    descricao:
      'Proteção com design: aço inox, alumínio e vidro temperado/laminado conforme norma.',
    imgs: [
      'assets/servicos/corrimao/FOTO (1).jpeg',
      'assets/servicos/corrimao/FOTO (2).jpeg'
    ],
  },
  {
    icon: 'bi bi-grid-3x3-gap',
    titulo: 'Portas e Janelas',
    descricao:
      'Ambientes integrados com portas de correr, pivotantes e divisórias em vidro.',
    imgs: [
      'assets/servicos/portas e janelas/FOTO (1).jpeg',
      'assets/servicos/portas e janelas/FOTO (2).jpeg',
      'assets/servicos/portas e janelas/FOTO (3).jpeg',
      'assets/servicos/portas e janelas/FOTO (4).jpeg',
      'assets/servicos/portas e janelas/FOTO (5).jpeg',
      'assets/servicos/portas e janelas/FOTO (6).jpeg',
      'assets/servicos/portas e janelas/FOTO (7).jpeg',
      'assets/servicos/portas e janelas/FOTO (8).jpeg',
      'assets/servicos/portas e janelas/FOTO (9).jpeg',
      'assets/servicos/portas e janelas/FOTO (10).jpeg',
      'assets/servicos/portas e janelas/FOTO (11).jpeg'
    ],
  },
  {
    icon: 'bi bi-brightness-high',
    titulo: 'Coberturas',
    descricao:
      'Coberturas em vidro ou policarbonato, estrutura leve e alta durabilidade.',
    imgs: [
      'assets/servicos/coberturas/FOTO (1).jpeg',
      'assets/servicos/coberturas/FOTO (2).jpeg',
      'assets/servicos/coberturas/FOTO (3).jpeg',
    ],
  },
  {
  icon: 'bi bi-wrench', // ou 'bi bi-gear', se preferir
  titulo: 'Serviços em Aço Inox e Metalon',
  descricao:
    'Estruturas em metalon, Solda TIG/MIG, cortes precisos e acabamentos escovado ou polido. Projeto sob medida com montagem e fixação profissional.',
  imgs: [
    'assets/servicos/aco/FOTO (1).jpeg',
    'assets/servicos/aco/FOTO (2).jpeg',
    'assets/servicos/aco/FOTO (3).jpeg'
  ],
},

]);


parceiros = signal<Parceiro[]>([
  { nome: 'Aço Cearense', logo: 'https://www.grupoacocearense.com.br/wp-content/uploads/2018/10/gac.png', url: 'https://www.grupoacocearense.com.br' },
  { nome: 'Loja Produção', logo: 'https://logo.clearbit.com/lojaproducao.com?size=256',       url: 'https://lojaproducao.com' },
  { nome: 'Gran Marquise', logo: 'https://hotelgranmarquise.com/wp-content/uploads/2023/07/hotel-gran-marquise-logotipo.png',     url: 'https://www.granmarquise.com.br' },
  { nome: 'Casa Garcia (Fortaleza)', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0sqfL79vUNOlSk3PVOc3YgeJ7t_HnYBFbaw&s', url: 'https://casagarciafortaleza.com.br' },
  { nome: 'Postos rede Ceará', logo: 'https://rededepostosceara.com.br/wp-content/uploads/2024/07/logo-nova-rede-ceara.png', url: '' },
]);

/** Velocidade do carrossel (quanto menor, mais rápido). Ex.: '40s', '28s' */
partnersSpeed = '200s';



  // galeria (hotlink Unsplash; depois pode baixar e servir local)
imagens = signal<string[]>([
  // Banheiros / box de vidro
  'https://plus.unsplash.com/premium_photo-1681412504590-5c23f9a04e3d?q=80&w=1600&auto=format&fit=crop', // a que funcionou
  'https://unsplash.com/photos/3TBHo9914ss/download?force=true&w=1600',
  'https://unsplash.com/photos/uHMP8hXf0vg/download?force=true&w=1600',


  // Guarda-corpo / escadas / lobby com vidro
  'https://unsplash.com/photos/7YwZbR9dWeI/download?force=true&w=1600',
  'https://unsplash.com/photos/stM6gPNhS68/download?force=true&w=1600',

  // Escritórios / divisórias

  'https://unsplash.com/photos/GkuZdv11Gfo/download?force=true&w=1600',

  // Fachadas / vitrines
  'https://unsplash.com/photos/F6JeJTRwL-M/download?force=true&w=1600',
  'https://unsplash.com/photos/cKjaZ68gSrc/download?force=true&w=1600',
  'https://unsplash.com/photos/V5vF94h52r0/download?force=true&w=1600',
]);

 alts: string[] = [
    'Box de vidro','Espelho decorativo','Fachada em vidro',
    'Guarda-corpo de vidro','Divisórias de vidro','Vitrine de loja em vidro'
  ];


  galleryAlt = (idx: number) => this.alts[idx] ?? 'Projeto em vidro';

  /* ===== Carrossel 3x1 ===== */
  @ViewChild('g3Viewport', { static: false }) g3ViewportRef!: ElementRef<HTMLDivElement>;

  readonly g3PageSize = 3; // 3 itens por página

  g3Pages = computed(() => {
    const src = this.imagens();
    const out: string[][] = [];
    for (let i = 0; i < src.length; i += this.g3PageSize) out.push(src.slice(i, i + this.g3PageSize));
    return out;
  });

  g3PageCount = computed(() => Math.max(1, this.g3Pages().length));
  g3PageIndex = signal(0);

  ngAfterViewInit() { this.g3SyncFromScroll(); }

  @HostListener('window:resize') onWinResize() { this.g3SyncFromScroll(); }
  onG3Scroll() { this.g3SyncFromScroll(); }

  private g3SyncFromScroll() {
    const el = this.g3ViewportRef?.nativeElement; if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    this.g3PageIndex.set(Math.min(Math.max(page, 0), this.g3PageCount() - 1));
  }

  g3Next() {
    const el = this.g3ViewportRef?.nativeElement; if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
  }
  g3Prev() {
    const el = this.g3ViewportRef?.nativeElement; if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
  }
  g3GoTo(page: number) {
    const el = this.g3ViewportRef?.nativeElement; if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' });
  }

  /* ===== Lightbox ===== */
  lightboxIndex = signal<number | null>(null);
  openLightbox(idx: number) { this.lightboxIndex.set(idx); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxIndex.set(null); document.body.style.overflow = ''; }
  lightboxPrev(e?: Event) {
    e?.preventDefault(); e?.stopPropagation();
    const n = this.imagens().length; const i = this.lightboxIndex(); if (i === null) return;
    this.lightboxIndex.set((i - 1 + n) % n);
  }
  lightboxNext(e?: Event) {
    e?.preventDefault(); e?.stopPropagation();
    const n = this.imagens().length; const i = this.lightboxIndex(); if (i === null) return;
    this.lightboxIndex.set((i + 1) % n);
  }
  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    if (this.lightboxIndex() === null) return;
    if (ev.key === 'Escape') this.closeLightbox();
    if (ev.key === 'ArrowLeft') this.lightboxPrev(ev);
    if (ev.key === 'ArrowRight') this.lightboxNext(ev);
  }


  // depoimentos







  // LIGHT BOX SERVIÇOS
// 3) Estado do lightbox de serviços
srvLbServiceIdx = signal<number | null>(null);
srvLbImgIdx     = signal(0);

currentSrvImgs = computed(() => {
  const si = this.srvLbServiceIdx();
  return si === null ? [] : this.servicos()[si].imgs;
});
currentSrvImg = computed(() => {
  const arr = this.currentSrvImgs();
  const i = this.srvLbImgIdx();
  return arr.length ? arr[(i % arr.length + arr.length) % arr.length] : '';
});

// 4) Ações
openSrvLightbox(serviceIndex: number, imgIndex = 0) {
  this.srvLbServiceIdx.set(serviceIndex);
  this.srvLbImgIdx.set(imgIndex);
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
}
closeSrvLightbox() {
  this.srvLbServiceIdx.set(null);
  this.srvLbImgIdx.set(0);
  if (typeof document !== 'undefined') document.body.style.overflow = '';
}
srvLbPrev(e?: Event) {
  e?.preventDefault(); e?.stopPropagation();
  this.srvLbImgIdx.update(i => i - 1);
}
srvLbNext(e?: Event) {
  e?.preventDefault(); e?.stopPropagation();
  this.srvLbImgIdx.update(i => i + 1);
}


  // link do Whats
  whatsappUrl = computed(() => {
    const msg = encodeURIComponent(this.mensagem);
    return `https://wa.me/55${this.whatsapp}?text=${msg}`;
  });

}
